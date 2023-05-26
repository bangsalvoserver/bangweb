import { GameManager } from "../Messages/GameManager";
import ConnectScene from './Connect/Connect';
import LobbyScene from "./Lobby/Lobby";
import WaitingArea from './WaitingArea/WaitingArea';

export enum SceneType {
    Connect,
    WaitingArea,
    Lobby
}

type GetCurrentSceneProps = {
    scene: SceneType,
    args: any,
    gameManager: GameManager,
}

export function GetCurrentScene({ scene, args, gameManager }: GetCurrentSceneProps) {
    switch (scene) {
        case SceneType.Connect: return (<ConnectScene gameManager={gameManager} />);
        case SceneType.WaitingArea: return (<WaitingArea gameManager={gameManager} myUserId={args.myUserId} />);
        case SceneType.Lobby: return (<LobbyScene gameManager={gameManager} lobbyName={args.lobbyName} myUserId={args.myUserId} />);
        default: return null;
    }
}