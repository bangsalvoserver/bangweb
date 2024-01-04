import { CSSProperties, RefObject } from "react";
import getLabel from "../../Locale/GetLabel";
import { getCardUrl } from "./CardView";
import { PlayerRole } from "./Model/CardEnums";
import { Milliseconds, PlayerId } from "./Model/GameUpdate";
import "./Style/CardView.css";
import { CardOverlayTracker, useCardOverlay } from "./Model/CardOverlayTracker";

export interface RoleProps {
    playerId: PlayerId;
    role: PlayerRole;
    flipDuration?: Milliseconds;
    roleRef?: RefObject<HTMLDivElement>;
    cardOverlayTracker?: CardOverlayTracker;
}

export default function RoleView({ playerId, role, flipDuration, roleRef, cardOverlayTracker }: RoleProps) {
    useCardOverlay('player_role', playerId, roleRef, cardOverlayTracker);

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