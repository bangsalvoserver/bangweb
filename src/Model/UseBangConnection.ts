import { useEffect, useReducer } from "react";
import useEvent from "react-use-event-hook";
import { GameUpdate } from "../Scenes/Game/Model/GameUpdate";
import { UserValue } from "../Scenes/Lobby/LobbyUser";
import { LobbyValue } from "../Scenes/WaitingArea/LobbyElement";
import { deserializeImage, PROPIC_SIZE, serializeImage } from "../Utils/ImageSerial";
import { createUnionDispatch } from "../Utils/UnionUtils";
import useChannel, { Channel } from "../Utils/UseChannel";
import useWebSocket, { WebSocketConnection } from "../Utils/UseWebSocket";
import { useSettings } from "./AppSettings";
import { ClientMessage } from "./ClientMessage";
import Env from "./Env";
import { defaultCurrentScene, LobbyState, sceneReducer, UpdateFunction } from "./SceneState";
import { ChatMessage, LobbyAddUser, LobbyUpdate, LobbyUserPropic, ServerMessage } from "./ServerMessage";

function handleUpdateLobbies({ lobby_id, name, num_players, num_spectators, max_players, state }: LobbyUpdate): UpdateFunction<LobbyValue[]> {
    return lobbies => {
        let copy = [...lobbies];
        const newLobby: LobbyValue = { id: lobby_id, name, num_players, num_spectators, max_players, state };
        let index = copy.findIndex(lobby => lobby.id === lobby_id);
        if (index >= 0) {
            copy[index] = newLobby;
        } else {
            copy.push(newLobby);
        }
        return copy;
    };
}

function handleLobbyAddUser({ user_id, username, team, lifetime }: LobbyAddUser): UpdateFunction<LobbyState> {
    return lobbyState => {
        let users = lobbyState.users.slice();

        const index = users.findIndex(user => user.id === user_id);
        const newUser: UserValue = { id: user_id, name: username, team, lifetime }
        if (index >= 0) {
            users[index] = { ...users[index], ...newUser };
        } else {
            users.push(newUser);
        }
        return { ...lobbyState, users };
    };
}

function handleLobbyUserPropic({ user_id, propic }: LobbyUserPropic): UpdateFunction<LobbyState> {
    return lobbyState => ({
        ...lobbyState,
        users: lobbyState.users.map(user => user.id === user_id
            ? { ...user, propic: deserializeImage(propic) }
            : user)
    });
}

function handleLobbyRemoveUser(user_id: number): UpdateFunction<LobbyState> {
    return lobbyState => ({
        ...lobbyState,
        users: lobbyState.users.filter(user => user.id !== user_id)
    });
}

function handleLobbyChat(message: ChatMessage): UpdateFunction<LobbyState> {
    return lobbyState => ({
        ...lobbyState,
        chatMessages: lobbyState.chatMessages.concat(message)
    });
}

export type GameChannel = Channel<GameUpdate>;

export type BangConnection = WebSocketConnection<ServerMessage, ClientMessage>;

export default function useBangConnection() {
    const settings = useSettings();

    const [scene, sceneDispatch] = useReducer(sceneReducer, settings.sessionId, defaultCurrentScene);
    const gameChannel = useChannel<GameUpdate>();

    const connection = useWebSocket<ServerMessage, ClientMessage>(Env.bangServerUrl);

    const initial = useEvent(() => {
        if (settings.sessionId) {
            connection.connect();
        }
    });

    const connected = useEvent(async () => {
        connection.sendMessage({
            connect: {
                username: settings.username || '',
                propic: await serializeImage(settings.propic, PROPIC_SIZE),
                session_id: settings.sessionId ?? 0
            }
        });
    });

    const disconnected = useEvent((code: number | null, reason: string | null) => {
        sceneDispatch({ reset: {} });
        if (reason) {
            sceneDispatch({ setError: { type: 'server', code, message: reason }});
        } else if (scene.type === 'loading') {
            sceneDispatch({ setError: { type: 'server', code, message: 'ERROR_CANNOT_CONNECT_TO_SERVER' }});
        } else if (settings.sessionId) {
            sceneDispatch({ setError: { type: 'server', code, message: 'ERROR_DISCONNECTED_FROM_SERVER' }});
        }
    });

    useEffect(() => {
        switch (connection.connectionState.state) {
        case 'initial': initial(); break;
        case 'connected': connected(); break;
        case 'disconnected': disconnected(connection.connectionState.code, connection.connectionState.reason); break;
        }
    }, [connection, initial, connected, disconnected]);

    useEffect(() => {
        connection.subscribe(createUnionDispatch<ServerMessage>({
            ping() {
                connection.sendMessage({ pong: {} });
            },
            client_accepted({ session_id }) {
                settings.setSessionId(session_id);
                sceneDispatch({ gotoWaitingArea: {} });
            },
            lobby_error(message) {
                sceneDispatch({ setError: { type:'lobby', message } });
            },
            lobby_update(message: LobbyUpdate) {
                sceneDispatch({ updateLobbies: handleUpdateLobbies(message) });
            },
            lobby_entered(message) {
                gameChannel.clear();
                sceneDispatch({ handleLobbyEntered: message });
            },
            lobby_edited(lobbyInfo) {
                sceneDispatch({ updateLobbyInfo: _ => lobbyInfo });
            },
            lobby_removed({ lobby_id }) {
                sceneDispatch({ updateLobbies: lobbies => lobbies.filter(lobby => lobby.id !== lobby_id) });
            },
            lobby_add_user(message) {
                sceneDispatch({ updateLobbyState: handleLobbyAddUser(message) });
            },
            lobby_user_propic(value) {
                sceneDispatch({ updateLobbyState: handleLobbyUserPropic(value) })
            },
            lobby_remove_user(user_id) {
                sceneDispatch({ updateLobbyState: handleLobbyRemoveUser(user_id) });
            },
            lobby_kick() {
                sceneDispatch({ gotoWaitingArea: {} });
            },
            lobby_chat(message) {
                sceneDispatch({ updateLobbyState: handleLobbyChat(message) })
            },
            game_update(update) {
                gameChannel.update(update);
            },
            game_started() {
                sceneDispatch({ gotoGame: {} });
            },
        }));
        return connection.unsubscribe;
    }, [connection, settings, gameChannel]);

    const handleConnect = useEvent(() => {
        if (connection.connectionState.state !== 'connected') {
            connection.connect();
            sceneDispatch({ gotoLoading: {} });
        }
    });

    const setGameOptions = useEvent(gameOptions => {
        if (scene.type !== 'lobby') {
            throw new Error('Invalid scene type: ' + scene.type);
        }
        connection.sendMessage({ lobby_edit: { name: scene.lobbyInfo.name, options: gameOptions } });
        sceneDispatch({ updateLobbyInfo: lobbyInfo => ({ ...lobbyInfo, options: gameOptions }) });
        settings.setGameOptions(gameOptions);
    });

    const clearError = useEvent(() => sceneDispatch({ setError: null }));

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (scene.error) sceneDispatch({ setError: null });
        }, 5000);
        return () => clearTimeout(timeout);
    }, [scene.error]);

    return { scene, settings, connection, gameChannel, setGameOptions, handleConnect, clearError } as const;
}