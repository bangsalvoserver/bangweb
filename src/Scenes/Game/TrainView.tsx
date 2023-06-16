import { CSSProperties, forwardRef, useContext } from "react";
import { Card } from "./Model/GameTable";
import { GameTableContext } from "./GameScene";
import PocketView, { PocketPosition } from "./PocketView";
import "./Style/TrainView.css";

export interface TrainProps {
    onClickCard: (card: Card) => void;
}

const TrainView = forwardRef<PocketPosition, TrainProps>(({ onClickCard }, ref) => {
    const table = useContext(GameTableContext);

    let trainPositionStyle = {
        '--train-position': table.status.train_position
    } as CSSProperties;

    let classes = ['train-container'];

    if (table.animation) {
        if ('move_train' in table.animation) {
            const animation = table.animation.move_train;

            classes.push('train-container-move');
            trainPositionStyle = {
                ...trainPositionStyle,
                '--train-position-diff': animation.position - table.status.train_position,
                '--duration': animation.duration + 'ms'
            } as CSSProperties;
        }
    }

    return (
        <div className={classes.join(' ')} style={trainPositionStyle}>
            <div className="train-container-inner">
                <PocketView ref={ref} cards={table.pockets.train.slice().reverse()} onClickCard={onClickCard} />
            </div>
        </div>
    );
});

export default TrainView;