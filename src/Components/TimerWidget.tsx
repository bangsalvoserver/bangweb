import { CSSProperties } from "react";
import { Milliseconds } from "../Model/ServerMessage";

import "./Style/TimerAnimation.css";

export interface TimerProps {
    duration: Milliseconds;
}

export default function TimerWidget({ duration }: TimerProps) {
    const style = {
        '--duration': duration + 'ms'
    } as CSSProperties;
    return <div className="timer-widget" style={style} />;
}