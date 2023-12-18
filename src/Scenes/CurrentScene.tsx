import { ClientMessage } from "../Messages/ClientMessage";
import { LobbyInfo, ServerMessage } from "../Messages/ServerMessage";
import AppSettings from "../Model/AppSettings";
import ConnectScene from "./Connect/Connect";
import LobbyScene from "./Lobby/Lobby";
import WaitingArea from "./WaitingArea/WaitingArea";

export type SceneType =
    { type: 'connect' } |
    { type: 'waiting_area' } |
    { type: 'lobby', lobbyInfo: LobbyInfo };

export interface CurrentSceneProps {
    scene: SceneType;
    setScene: (scene: SceneType) => void;
    settings: AppSettings;
    lastMessage: ServerMessage | null;
    sendMessage: (message: ClientMessage) => void;
    connect: () => void;
}

export default function CurrentScene({ scene, setScene, settings, lastMessage, sendMessage, connect }: CurrentSceneProps) {
    switch (scene.type) {
        case 'connect':
            return <ConnectScene
                username={settings.username}
                setUsername={settings.setUsername}
                connect={connect}
            />;
        case 'waiting_area':
            return <WaitingArea
                lobbyName={settings.lobbyName}
                setLobbyName={settings.setLobbyName}
                gameOptions={settings.gameOptions}
                lastMessage={lastMessage}
                sendMessage={sendMessage}
            />;
        case 'lobby':
            return <LobbyScene
                myUserId={settings.myUserId}
                myLobbyId={settings.myLobbyId}
                lobbyInfo={scene.lobbyInfo}
                lastMessage={lastMessage}
                sendMessage={sendMessage}
                setGameOptions={gameOptions => {
                    setScene({ type: 'lobby', lobbyInfo: { ...scene.lobbyInfo, options: gameOptions }});
                    settings.setGameOptions(gameOptions);
                }}
            />;
    }
}