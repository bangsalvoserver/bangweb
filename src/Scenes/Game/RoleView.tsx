import { CSSProperties, Ref } from "react";
import getLabel from "../../Locale/GetLabel";
import { getCardUrl } from "./CardView";
import { PlayerRole } from "./Model/CardEnums";
import { Milliseconds } from "./Model/GameUpdate";
import "./Style/CardView.css";

export interface RoleProps {
    role: PlayerRole;
    flipDuration?: Milliseconds;
    roleRef?: Ref<HTMLDivElement>;
}

export default function RoleView({ role, flipDuration, roleRef }: RoleProps) {
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
        <div ref={roleRef} style={style} className={classes.join(' ')}>
            <div className="card-front">
                <img className="card-view-img" src={imageSrc} alt={getLabel('role', role)} />
            </div>
            {flipDuration ? <div className="card-back-flip">
                <img className="card-view-img" src={backfaceSrc} alt="" />
            </div> : null}
        </div>
    </div>;
}