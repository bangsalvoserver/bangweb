import AppSettings from "../Model/AppSettings";
import ConnectScene from "./Connect/Connect";
import { GameOptions } from "./Game/Model/GameUpdate";
import LobbyScene from "./Lobby/Lobby";
import WaitingArea from "./WaitingArea/WaitingArea";

export type SceneType =
    { type: 'connect' } |
    { type: 'waiting_area' } |
    { type: 'lobby', lobbyName: string, gameOptions: GameOptions };

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
                lobbyName={scene.lobbyName}
                gameOptions={scene.gameOptions}
                setGameOptions={gameOptions => {
                    setScene({ type: 'lobby', lobbyName:scene.lobbyName, gameOptions });
                    settings.setGameOptions(gameOptions);
                }}
            />;
    }
}