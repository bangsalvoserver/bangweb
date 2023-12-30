import { useCallback, useEffect, useReducer } from "react";
import getLabel from "../Locale/GetLabel";
import { GameUpdate } from "../Scenes/Game/Model/GameUpdate";
import { SetGameOptions, getUser } from "../Scenes/Lobby/Lobby";
import { UserValue } from "../Scenes/Lobby/LobbyUser";
import { LobbyValue } from "../Scenes/WaitingArea/LobbyElement";
import { ImageSrc, deserializeImage, serializeImage } from "../Utils/ImageSerial";
import { createUnionReducer } from "../Utils/UnionUtils";
import { useSettings } from "./AppSettings";
import Env from "./Env";
import { LobbyState, UpdateFunction, defaultCurrentScene, sceneReducer } from "./SceneState";
import { LobbyAddUser, LobbyRemoveUser, LobbyUpdate, ServerMessage, UserId, UserInfo } from "./ServerMessage";
import useConnection from "./UseConnection";
import useObserver, { Observer } from "./UseObserver";

export async function makeUserInfo(username?: string, propic?: ImageSrc): Promise<UserInfo> {
    return {
        name: username ?? '',
        profile_image: await serializeImage(propic, 50)
    };
}

function handleUpdateLobbies({ lobby_id, name, num_players, state }: LobbyUpdate): UpdateFunction<LobbyValue[]> {
    return lobbies => {
        let copy = [...lobbies];
        const newLobby = { id: lobby_id, name, num_players, state };
        let index = copy.findIndex(lobby => lobby.id === lobby_id);
        if (index >= 0) {
            copy[index] = newLobby;
        } else {
            copy.push(newLobby);
        }
        return copy;
    };
}

function handleLobbyAddUser({ user_id, user: { name, profile_image }, is_read }: LobbyAddUser, myUserId?: UserId): UpdateFunction<LobbyState> {
    return lobbyState => {
        let chatMessages = lobbyState.chatMessages;
        let users = [...lobbyState.users];

        const newUser: UserValue = { id: user_id, name, propic: deserializeImage(profile_image) };
        let index = users.findIndex(user => user.id === user_id);
        if (index >= 0) {
            users[index] = newUser;
        } else {
            if (user_id >= 0) {
                chatMessages = chatMessages.concat({
                    user_id: 0,
                    message: getLabel('lobby', 'USER_JOINED_LOBBY', name),
                    is_read: is_read || user_id === myUserId
                });
            }
            users.push(newUser);
        }
        return { ...lobbyState, users, chatMessages };
    };
}

function handleLobbyRemoveUser({ user_id }: LobbyRemoveUser): UpdateFunction<LobbyState> {
    return lobbyState => {
        let users = lobbyState.users;
        let chatMessages = lobbyState.chatMessages;

        if (user_id >= 0) {
            const user = getUser(users, user_id);
            if (user) {
                chatMessages = chatMessages.concat({
                    user_id: 0,
                    message: getLabel('lobby', 'USER_LEFT_LOBBY', user.name),
                    is_read: false
                });
            }
        }

        users = users.filter(user => user.id !== user_id);
        return { ...lobbyState, users, chatMessages };
    };
}

export type GameUpdateObserver = Observer<GameUpdate>;

function getServerUrl(): string {
    return Env.bangServerUrl ?? `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/server`;
}

export default function useBangConnection() {
    const [scene, sceneDispatch] = useReducer(sceneReducer, null, defaultCurrentScene);
    const observer: GameUpdateObserver = useObserver<GameUpdate>();

    const settings = useSettings();
    const connection = useConnection(getServerUrl());

    useEffect(() => {
        const handler = createUnionReducer<undefined, ServerMessage, void>({
            ping() {
                connection.sendMessage({ pong: {} });
            },
            async connected () {
                connection.sendMessage({
                    connect: {
                        user: await makeUserInfo(settings.username, settings.propic),
                        user_id: settings.myUserId,
                        commit_hash: Env.commitHash
                    }
                });
            },
            disconnected() {
                sceneDispatch({ reset: {} });
            },
            client_accepted({ user_id }) {
                if (settings.myLobbyId) {
                    connection.sendMessage({ lobby_join: { lobby_id: settings.myLobbyId } });
                }
                settings.setMyUserId(user_id);
                sceneDispatch({ gotoWaitingArea: {} });
            },
            lobby_error(message) {
                // TODO add gui element for lobby error
                console.error('Lobby error: ', getLabel('lobby', message));
            },
            lobby_update(message: LobbyUpdate) {
                sceneDispatch({ updateLobbies: handleUpdateLobbies(message) });
            },
            lobby_entered(message) {
                observer.clear();
                settings.setMyLobbyId(message.lobby_id);
                sceneDispatch({ handleLobbyEntered: message });
            },
            lobby_edited(lobbyInfo) {
                sceneDispatch({ updateLobbyInfo: _ => lobbyInfo });
            },
            lobby_removed({ lobby_id }) {
                sceneDispatch({ updateLobbies: lobbies => lobbies.filter(lobby => lobby.id !== lobby_id) });
            },
            lobby_owner({ user_id }) {
                sceneDispatch({ updateLobbyState: lobbyState => ({ ...lobbyState, lobbyOwner: user_id }) });
            },
            lobby_add_user(message) {
                sceneDispatch({ updateLobbyState: handleLobbyAddUser(message, settings.myUserId) });
            },
            lobby_remove_user({ user_id }) {
                if (user_id === settings.myUserId) {
                    settings.setMyLobbyId(undefined);
                    sceneDispatch({ gotoWaitingArea: {} });
                } else {
                    sceneDispatch({ updateLobbyState: handleLobbyRemoveUser({ user_id }) });
                }
            },
            lobby_chat(message) {
                sceneDispatch({ updateLobbyState: lobbyState => ({ ...lobbyState, chatMessages: lobbyState.chatMessages.concat(message) }) });
            },
            game_update(update) {
                observer.update(update);
            },
            game_started() {
                sceneDispatch({ gotoGame: {} });
            },
        })

        connection.subscribe(update => handler(undefined, update));

        return () => connection.unsubscribe();
    }, [connection, settings, observer]);

    useEffect(() => {
        if (settings.myUserId && !connection.isConnected()) {
            connection.connect();
        }
    }, [connection, settings.myUserId]);

    const setGameOptions: SetGameOptions = useCallback(gameOptions => {
        if (scene.type !== 'lobby') {
            throw new Error('Invalid scene type: ' + scene.type);
        }
        connection.sendMessage({ lobby_edit: { name: scene.lobbyInfo.name, options: gameOptions } });
        sceneDispatch({ updateLobbyInfo: lobbyInfo => ({ ...lobbyInfo, options: gameOptions }) });
        settings.setGameOptions(gameOptions);
    }, [scene, connection, settings]);

    return { scene, settings, connection, observer, setGameOptions } as const;
}