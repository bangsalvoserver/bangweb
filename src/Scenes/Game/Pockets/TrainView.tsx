import { CSSProperties, Ref, useContext } from "react";
import { GameStateContext } from "../GameScene";
import { PocketRef } from "../Model/CardTracker";
import PocketView from "./PocketView";
import "./Style/TrainView.css";
import { getModifierContext } from "../Model/TargetSelector";

export interface TrainProps {
    pocketRef?: Ref<PocketRef>;
}

export default function TrainView({ pocketRef }: TrainProps) {
    const { table, selector } = useContext(GameStateContext);

    let trainPositionStyle = {
        '--train-position': table.status.train_position
    } as CSSProperties;

    let classes = ['train-container'];

    let trainKey: number | null = null;
    switch (table.animation.type) {
    case 'move_train':
        trainKey = table.animation.key;

        classes.push('train-container-move');
        trainPositionStyle = {
            ...trainPositionStyle,
            '--train-position-diff': table.animation.position - table.status.train_position,
            '--duration': table.animation.duration + 'ms'
        } as CSSProperties;
        break;
    case 'none':
        const trainAdvance = getModifierContext(selector, 'train_advance') ?? 0;
        if (trainAdvance > 0) {
            classes.push('train-advance-transition');
            trainPositionStyle = {
                ...trainPositionStyle,
                '--train-position-diff': trainAdvance
            } as CSSProperties;
        }
        break;
    }

    return (
        <div className={classes.join(' ')} style={trainPositionStyle}>
            <div className="train-container-inner" key={trainKey}>
                <PocketView pocketRef={pocketRef} cards={table.pockets.train.slice().reverse()} />
            </div>
        </div>
    );
}