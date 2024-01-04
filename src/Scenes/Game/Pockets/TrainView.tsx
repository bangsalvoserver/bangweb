import { CSSProperties, Ref, useContext } from "react";
import { GameTableContext } from "../GameScene";
import { CardOverlayTracker } from "../Model/CardOverlayTracker";
import { PocketRef } from "../Model/CardTracker";
import { Card } from "../Model/GameTable";
import { isSelectionPlaying } from "../Model/TargetSelector";
import PocketView from "./PocketView";
import "./Style/TrainView.css";

export interface TrainProps {
    pocketRef?: Ref<PocketRef>;
    onClickCard?: (card: Card) => void;
    cardOverlayTracker?: CardOverlayTracker;
}

export default function TrainView({ pocketRef, onClickCard, cardOverlayTracker }: TrainProps) {
    const table = useContext(GameTableContext);
    const selector = table.selector;

    let trainPositionStyle = {
        '--train-position': table.status.train_position
    } as CSSProperties;

    let classes = ['train-container'];

    let animationKey: number | null = null;
    if (table.animation) {
        if ('move_train' in table.animation) {
            animationKey = table.animationKey;
            const animation = table.animation.move_train;

            classes.push('train-container-move');
            trainPositionStyle = {
                ...trainPositionStyle,
                '--train-position-diff': animation.position - table.status.train_position,
                '--duration': animation.duration + 'ms'
            } as CSSProperties;
        }
    } else if (isSelectionPlaying(selector)) {
        if (selector.selection.context.train_advance) {
            classes.push('train-advance-transition');
            trainPositionStyle = {
                ...trainPositionStyle,
                '--train-position-diff': selector.selection.context.train_advance
            } as CSSProperties;
        }
    }

    return (
        <div className={classes.join(' ')} style={trainPositionStyle}>
            <div className="train-container-inner" key={animationKey}>
                <PocketView
                    pocketRef={pocketRef}
                    cards={table.pockets.train.slice().reverse()}
                    onClickCard={onClickCard}
                    cardOverlayTracker={cardOverlayTracker} />
            </div>
        </div>
    );
}