import ConnectScene from "./Connect/Connect";
import LobbyScene, { LobbyProps } from "./Lobby/Lobby"
import WaitingArea from "./WaitingArea/WaitingArea";

export type CurrentSceneUnion =
    { connect: {} } |
    { waiting_area: {} } |
    { lobby: LobbyProps };

export interface CurrentSceneProps {
    scene: CurrentSceneUnion;
}

export default function CurrentScene({ scene }: CurrentSceneProps) {
    if ('connect' in scene) {
        return (<ConnectScene { ...scene.connect }/>);
    }
    if ('waiting_area' in scene) {
        return (<WaitingArea { ...scene.waiting_area }/>);
    }
    if ('lobby' in scene) {
        return (<LobbyScene { ...scene.lobby } />);
    }
    return (<></>);
}