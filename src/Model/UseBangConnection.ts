import { useEffect, useReducer, useRef } from "react";
import useEvent from "react-use-event-hook";
import { GameUpdate } from "../Scenes/Game/Model/GameUpdate";
import { PROPIC_SIZE, serializeImage } from "../Utils/ImageSerial";
import { createUnionDispatch } from "../Utils/UnionUtils";
import useChannel, { Channel } from "../Utils/UseChannel";
import useWebSocket, { WebSocketConnection } from "../Utils/UseWebSocket";
import { useSettings } from "./AppSettings";
import { ClientMessage } from "./ClientMessage";
import Env from "./Env";
import { defaultCurrentScene, sceneReducer } from "./SceneState";
import { ServerMessage } from "./ServerMessage";

export type GameChannel = Channel<GameUpdate>;

export type BangConnection = WebSocketConnection<ServerMessage, ClientMessage>;

export default function useBangConnection() {
    const settings = useSettings();

    const [scene, sceneDispatch] = useReducer(sceneReducer, settings.sessionId, defaultCurrentScene);
    const gameChannel = useChannel<GameUpdate>();

    const connection = useWebSocket<ServerMessage, ClientMessage>(Env.bangServerUrl);

    const reconnecting = useRef<number>();

    const initial = useEvent(() => {
        if (settings.sessionId) {
            connection.connect();
        }
    });

    const connected = useEvent(async () => {
        clearTimeout(reconnecting.current);
        reconnecting.current = undefined;

        connection.sendMessage({
            connect: {
                username: settings.username || '',
                propic: await serializeImage(settings.propic, PROPIC_SIZE),
                session_id: settings.sessionId ?? 0
            }
        });
    });

    const disconnected = useEvent((code: number | null, reason: string | null) => {
        sceneDispatch({ gotoHome: {} });
        if (reason) {
            sceneDispatch({ setError: { type: 'server', code, message: reason }});
        } else if (scene.type === 'loading') {
            sceneDispatch({ setError: { type: 'server', code, message: 'ERROR_CANNOT_CONNECT_TO_SERVER' }});
        } else if (settings.sessionId) {
            sceneDispatch({ setError: { type: 'server', code, message: 'ERROR_DISCONNECTED_FROM_SERVER' }});
            if (!reconnecting.current && code !== null && code !== 1000) {
                sceneDispatch({ gotoLoading: 'RECONNECTING' });
                reconnecting.current = setTimeout(() => connection.connect(), 1000);
            }
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
            lobby_update(message) {
                sceneDispatch({ updateLobbies: message });
            },
            lobby_entered(message) {
                gameChannel.clear();
                sceneDispatch({ gotoLobby: message });
            },
            lobby_game_options(options) {
                sceneDispatch({ setGameOptions: options });
            },
            lobby_removed({ lobby_id }) {
                sceneDispatch({ removeLobby: lobby_id });
            },
            lobby_user_update(message) {
                sceneDispatch({ updateLobbyUser: message });
            },
            lobby_kick() {
                sceneDispatch({ gotoWaitingArea: {} });
            },
            lobby_chat(message) {
                sceneDispatch({ addLobbyChatMessage: message })
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
            clearTimeout(reconnecting.current);
            reconnecting.current = undefined;
            connection.connect();
            sceneDispatch({ gotoLoading: 'LOADING' });
        }
    });

    const setGameOptions = useEvent(gameOptions => {
        if (scene.type !== 'lobby') {
            throw new Error('Invalid scene type for setGameOptions: ' + scene.type);
        }
        connection.sendMessage({ lobby_game_options: gameOptions });
        sceneDispatch({ setGameOptions: gameOptions });
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