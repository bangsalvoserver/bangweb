import { CSSProperties, useRef } from "react";
import getLabel from "../../Locale/GetLabel";
import { getCardUrl } from "./CardView";
import { PlayerRole } from "./Model/CardEnums";
import { Milliseconds } from "./Model/GameUpdate";
import useCardOverlay from "./Model/UseCardOverlay";
import "./Style/CardView.css";

export interface RoleProps {
    role: PlayerRole;
    flipDuration?: Milliseconds;
}

export default function RoleView({ role, flipDuration }: RoleProps) {
    const divRef = useRef<HTMLDivElement>(null);
    useCardOverlay('role', role, divRef);

    const backfaceSrc = getCardUrl('backface/role');
    const imageSrc = role === 'unknown' ? backfaceSrc : getCardUrl('role/' + role);

    let style: CSSProperties | undefined;

    let classes = ['card-view'];

    if (flipDuration) {
        style = {
            '--duration': flipDuration + 'ms'
        } as CSSProperties;

        classes.push('card-animation', 'card-animation-flip');
        if (role !== 'unknown') classes.push('card-animation-reverse');
    }

    return <div className='pocket-view'>
        <div ref={divRef} style={style} className={classes.join(' ')}>
            <div className="card-front">
                <img className="card-view-img" src={imageSrc} alt={getLabel('PlayerRole', role)} />
            </div>
            {flipDuration ? <div className="card-back-flip">
                <img className="card-view-img" src={backfaceSrc} alt="" />
            </div> : null}
        </div>
    </div>;
}