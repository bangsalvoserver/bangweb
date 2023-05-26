import { GameManager } from "../Messages/GameManager";
import ConnectScene from './Connect/Connect';
import WaitingArea from './WaitingArea/WaitingArea';

export type SceneProps = {
    gameManager: GameManager
};

export enum SceneType {
    Connect,
    WaitingArea
}

type GetCurrentSceneProps = {
    scene: SceneType,
    gameManager: GameManager,
}

export function GetCurrentScene({ scene, gameManager }: GetCurrentSceneProps) {
    switch (scene) {
        case SceneType.Connect: return (<ConnectScene gameManager= { gameManager } />);
        case SceneType.WaitingArea: return (<WaitingArea gameManager= { gameManager } />);
        default: return null;
    }
}