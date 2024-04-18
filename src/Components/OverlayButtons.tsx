import { RefObject } from "react";
import AppSettings from "../Model/AppSettings";
import { SceneState } from "../Model/SceneState";
import { BangConnection } from "../Model/UseBangConnection";
import LobbyChat from "./LobbyChat";
import "./Style/OverlayButtons.css";

export interface OverlayProps {
    scene: SceneState;
    settings: AppSettings;
    connection: BangConnection;
    overlayRef?: RefObject<HTMLDivElement>;
}

export default function OverlayButtons({ scene, settings, connection, overlayRef }: OverlayProps) {
    return <div className="overlay-buttons" ref={overlayRef}>
        { 'lobbyState' in scene && <LobbyChat connection={connection} lobbyState={scene.lobbyState}/> }
    </div>
}