import { LobbyInfo } from "../Messages/ServerMessage";
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
}

export default function CurrentScene({ scene, setScene, settings }: CurrentSceneProps) {
    switch (scene.type) {
        case 'connect':
            return <ConnectScene
                username={settings.username}
                setUsername={settings.setUsername}
            />;
        case 'waiting_area':
            return <WaitingArea
                lobbyName={settings.lobbyName}
                setLobbyName={settings.setLobbyName}
                gameOptions={settings.gameOptions}
            />;
        case 'lobby':
            return <LobbyScene
                myUserId={settings.myUserId}
                myLobbyId={settings.myLobbyId}
                lobbyInfo={scene.lobbyInfo}
                setGameOptions={gameOptions => {
                    setScene({ type: 'lobby', lobbyInfo: { ...scene.lobbyInfo, options: gameOptions }});
                    settings.setGameOptions(gameOptions);
                }}
            />;
    }
}