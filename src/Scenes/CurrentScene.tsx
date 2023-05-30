import ConnectScene, { ConnectProps } from "./Connect/Connect";
import LobbyScene, { LobbyProps } from "./Lobby/Lobby"
import WaitingArea, { WaitingAreaProps } from "./WaitingArea/WaitingArea";

export type CurrentSceneUnion =
    { connect : ConnectProps } |
    { waiting_area: WaitingAreaProps } |
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