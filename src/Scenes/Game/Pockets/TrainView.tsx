import { CSSProperties, Ref, useContext } from "react";
import { GameStateContext } from "../GameScene";
import { PocketRef } from "../Model/CardTracker";
import PocketView from "./PocketView";
import "./Style/TrainView.css";
import { getModifierContext } from "../Model/TargetSelector";
import { getTablePocket } from "../Model/GameTable";

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
        trainKey = table.animationKey;

        classes.push('train-container-move');
        trainPositionStyle = {
            ...trainPositionStyle,
            '--train-position-diff': table.animation.position - table.status.train_position,
            '--duration': table.animation.duration + 'ms'
        } as CSSProperties;
        break;
    case 'none':
        if (getModifierContext(selector, 'train_advance')) {
            classes.push('train-advance-transition');
            trainPositionStyle = {
                ...trainPositionStyle,
                '--train-position-diff': 1
            } as CSSProperties;
        }
        break;
    }

    return (
        <div className={classes.join(' ')} style={trainPositionStyle}>
            <div className="train-container-inner" key={trainKey}>
                <PocketView pocketRef={pocketRef} cards={getTablePocket(table, 'train').slice().reverse()} />
            </div>
        </div>
    );
}