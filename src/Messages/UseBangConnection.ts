import { useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useRef } from "react";
import getLabel from "../Locale/GetLabel";
import { useSettings } from "../Model/AppSettings";
import Env from "../Model/Env";
import { defaultCurrentScene, sceneReducer } from "../Model/SceneState";
import { GameAction } from "../Scenes/Game/Model/GameAction";
import { GameUpdate } from "../Scenes/Game/Model/GameUpdate";
import { GameChannel } from "../Scenes/Game/Model/UseGameState";
import { getUser } from "../Scenes/Lobby/Lobby";
import { UserValue } from "../Scenes/Lobby/LobbyUser";
import { ImageSrc, deserializeImage, serializeImage } from "../Utils/ImageSerial";
import { MessageHandler, useSocketConnection } from "./Connection";
import { ChatMessage, ClientAccepted, LobbyAddUser, LobbyEntered, LobbyInfo, LobbyOwner, LobbyRemoveUser, LobbyRemoved, LobbyUpdate, UserInfo } from "./ServerMessage";

export async function makeUserInfo(username?: string, propic?: ImageSrc): Promise<UserInfo> {
    return {
        name: username ?? '',
        profile_image: await serializeImage(propic, 50)
    };
}

export default function useBangConnection() {
    const [scene, sceneDispatch] = useReducer(sceneReducer, null, defaultCurrentScene);
    const gameUpdates = useRef<GameUpdate[]>([]);

    const settings = useSettings();
    const connection = useSocketConnection();

    const useHandler = <K extends keyof MessageHandler>(key: K, fn: MessageHandler[K]) => {
        useLayoutEffect(() => {
            const handler = { [key]: fn };
            connection.addHandler(handler);
            return () => connection.removeHandler(handler);
        }, [key, fn]);
    }

    useEffect(() => {
        if (settings.myUserId && !connection.isConnected()) {
            connection.connect();
        }
    }, [settings.myUserId, connection]);

    useHandler('connected', useCallback(async () => {
        connection.sendMessage({
            connect: {
                user: await makeUserInfo(settings.username, settings.propic),
                user_id: settings.myUserId,
                commit_hash: Env.commitHash
            }
        });
    }, [connection, settings]));

    useHandler('client_accepted', useCallback(({ user_id }: ClientAccepted) => {
        if (settings.myLobbyId) {
            connection.sendMessage({ lobby_join: { lobby_id: settings.myLobbyId } });
        }
        settings.setMyUserId(user_id);
        sceneDispatch({ gotoWaitingArea: {} });
    }, [connection, settings]));

    useHandler('disconnected', useCallback(() => {
        sceneDispatch({ reset: {} });
    }, []));

    useHandler('ping', useCallback(() => {
        connection.sendMessage({ pong: {} });
    }, [connection]));

    useHandler('lobby_error', useCallback((message: string) => {
        console.error('Lobby error: ', getLabel('lobby', message));
    }, []));

    useHandler('lobby_remove_user', useCallback(({ user_id }: LobbyRemoveUser) => {
        if (user_id === settings.myUserId) {
            settings.setMyLobbyId(undefined);
            sceneDispatch({ gotoWaitingArea: {} });
        } else {
            sceneDispatch({
                updateLobbyState: lobbyState => {
                    let users = lobbyState.users;
                    let chatMessages = lobbyState.chatMessages;

                    const user = getUser(users, user_id);
                    if (user) {
                        chatMessages = chatMessages.concat({
                            user_id: 0,
                            message: getLabel('lobby', 'USER_LEFT_LOBBY', user.name),
                            is_read: false
                        });
                    }

                    users = users.filter(user => user.id !== user_id);
                    return { ...lobbyState, users, chatMessages };
                }
            });
        }
    }, [settings]));

    useHandler('lobby_entered', useCallback(({ lobby_id, name, options }: LobbyEntered) => {
        if (scene.type === 'lobby' && settings.myLobbyId === lobby_id) {
            gameUpdates.current = [];
            sceneDispatch({ updateLobbyState: lobbyState => ({ ...lobbyState, isGameStarted: false, users: [] }) });
        } else {
            settings.setMyLobbyId(lobby_id);
            sceneDispatch({ gotoLobby: { myUserId: settings.myUserId, lobbyInfo: { name, options } } });
        }
    }, [settings, scene.type]));

    useHandler('lobby_edited', useCallback((lobbyInfo: LobbyInfo) => {
        sceneDispatch({ updateLobbyInfo: _ => lobbyInfo });
    }, []));

    useHandler('lobby_add_user', useCallback(({ user_id, user: { name, profile_image }, is_read }: LobbyAddUser) => {
        sceneDispatch({
            updateLobbyState: lobbyState => {
                let chatMessages = lobbyState.chatMessages;
                let users = [...lobbyState.users];

                const newUser: UserValue = { id: user_id, name, propic: deserializeImage(profile_image) };
                let index = users.findIndex(user => user.id === user_id);
                if (index >= 0) {
                    users[index] = newUser;
                } else {
                    chatMessages = chatMessages.concat({
                        user_id: 0,
                        message: getLabel('lobby', 'USER_JOINED_LOBBY', name),
                        is_read: is_read || user_id === lobbyState.myUserId
                    });
                    users.push(newUser);
                }
                return { ...lobbyState, users, chatMessages };
            }
        });
    }, []));

    useHandler('lobby_owner', useCallback(({ user_id }: LobbyOwner) => {
        sceneDispatch({ updateLobbyState: lobbyState => ({ ...lobbyState, lobbyOwner: user_id }) });
    }, []));

    useHandler('lobby_chat', useCallback((message: ChatMessage) => {
        sceneDispatch({ updateLobbyState: lobbyState => ({ ...lobbyState, chatMessages: lobbyState.chatMessages.concat(message) }) });
    }, []));

    useHandler('game_started', useCallback(() => {
        sceneDispatch({ updateLobbyState: lobbyState => ({ ...lobbyState, isGameStarted: true }) });
    }, []));

    useHandler('game_update', useCallback((update: GameUpdate) => {
        gameUpdates.current.push(update);
    }, []));

    useHandler('lobby_update', useCallback(({ lobby_id, name, num_players, state }: LobbyUpdate) => {
        sceneDispatch({
            updateWaitingArea: lobbies => {
                let copy = [...lobbies];
                const newLobby = { id: lobby_id, name, num_players, state };
                let index = copy.findIndex(lobby => lobby.id === lobby_id);
                if (index >= 0) {
                    copy[index] = newLobby;
                } else {
                    copy.push(newLobby);
                }
                return copy;
            }
        });
    }, []));

    useHandler('lobby_removed', useCallback(({ lobby_id }: LobbyRemoved) => {
        sceneDispatch({ updateWaitingArea: lobbies => lobbies.filter((lobby) => lobby.id !== lobby_id) });
    }, []));

    const channel: GameChannel = useMemo(() => ({
        hasUpdates: () => gameUpdates.current.length !== 0,
        getNextUpdate: () => gameUpdates.current.shift(),
        sendGameAction: (action: GameAction) => connection.sendMessage({ game_action: action })
    }), [connection]);

    return { scene, sceneDispatch, settings, connection, channel } as const;
}