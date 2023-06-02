import { CSSProperties } from "react";
import { PlayerRole } from "../../Messages/CardEnums";
import { Milliseconds } from "../../Messages/GameUpdate";
import "./Style/CardView.css";

export interface RoleProps {
    role: PlayerRole;
    flipDuration?: Milliseconds;
}

export default function RoleView({ role, flipDuration }: RoleProps) {
    const backfaceSrc = '/cards/backface/role.png';
    const imageSrc = role == 'unknown' ? backfaceSrc : `/cards/role/${role}.png`;

    let style: CSSProperties | undefined;

    let classes = ['card-view'];

    if (flipDuration) {
        style = {
            '--duration': flipDuration + 'ms'
        } as CSSProperties;

        classes.push('card-animation', 'card-animation-flip');
        if (role != 'unknown') classes.push('card-animation-reverse');
    }

    return (
        <div style={style} className={classes.join(' ')}>
            <div className="card-front">
                <img className="card-view-img" src={imageSrc} />
            </div>
            {flipDuration ? <div className="card-back">
                <img className="card-view-img" src={backfaceSrc} />
            </div> : null}
        </div>
    );
}