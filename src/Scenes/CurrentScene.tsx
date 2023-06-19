import { Dispatch } from "react";
import AppSettings, { SettingsUpdate } from "../Model/AppSettings";
import ConnectScene from "./Connect/Connect";
import LobbyScene, { LobbyProps } from "./Lobby/Lobby";
import WaitingArea from "./WaitingArea/WaitingArea";

export type SceneType =
    { type: 'connect' } |
    { type: 'waiting_area' } |
    { type: 'lobby' } & LobbyProps;

export type SettingsProps = {
    settings: AppSettings;
    settingsDispatch: Dispatch<SettingsUpdate>;
}

export interface CurrentSceneProps extends SettingsProps {
    scene: SceneType;
}

export default function CurrentScene(props: CurrentSceneProps) {
    switch (props.scene.type) {
        case 'connect':
            return (<ConnectScene {...props} />);
        case 'waiting_area':
            return (<WaitingArea {...props} />);
        case 'lobby':
            return (<LobbyScene {...props} {...props.scene} />);
        default:
            return <></>;
    }
}