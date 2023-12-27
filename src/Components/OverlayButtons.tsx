import { RefObject } from "react";
import AppSettings from "../Model/AppSettings";
import { Connection } from "../Model/Connection";
import { SceneState } from "../Model/SceneState";
import LobbyChat from "./LobbyChat";
import "./Style/OverlayButtons.css";

export interface OverlayProps {
    scene: SceneState;
    settings: AppSettings;
    connection: Connection;
    overlayRef?: RefObject<HTMLDivElement>;
}

export default function OverlayButtons({ scene, settings, connection, overlayRef }: OverlayProps) {
    return <div className="overlay-buttons" ref={overlayRef}>
        { 'lobbyState' in scene && <LobbyChat myUserId={settings.myUserId} connection={connection} lobbyState={scene.lobbyState}/> }
    </div>
}