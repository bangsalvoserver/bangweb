import { CSSProperties, useRef } from "react";
import getLabel from "../../Locale/GetLabel";
import { getCardUrl } from "./CardView";
import { PlayerRole } from "./Model/CardEnums";
import { Player } from "./Model/GameTable";
import useCardOverlay from "./Model/UseCardOverlay";
import "./Style/CardView.css";
import { useLanguage } from "../../Locale/Registry";

export interface RoleProps {
    player: Player;
}

function getRoleImage(role: PlayerRole) {
    if (role === 'unknown') return 'backface/role';
    return 'role/' + role;
}

export default function RoleView({ player }: RoleProps) {
    const language = useLanguage();

    const divRef = useRef<HTMLDivElement>(null);
    
    let animationKey: number | undefined;

    let frontRole: PlayerRole = player.status.role;
    let backRole: PlayerRole = 'unknown';

    let classes = ['card-view'];
    let style: CSSProperties | undefined;

    if (player.animation.type === 'flipping_role') {
        animationKey = player.animationKey;

        backRole = frontRole;
        frontRole = player.animation.role;

        style = {
            '--duration': player.animation.duration + 'ms'
        } as CSSProperties;

        classes.push('card-animation', 'card-animation-flip');
    }

    const backfaceSrc = getRoleImage(backRole);
    const frontfaceSrc = getRoleImage(frontRole);
    const cardAlt = getLabel(language, 'PlayerRole', frontRole);

    useCardOverlay(frontfaceSrc, cardAlt, divRef);

    return <div className='pocket-view'>
        <div key={animationKey} ref={divRef} style={style} className={classes.join(' ')}>
            <div className="card-front">
                <img className="card-view-img" src={getCardUrl(frontfaceSrc)} alt={cardAlt} />
            </div>
            {animationKey ? <div className="card-back-flip">
                <img className="card-view-img" src={getCardUrl(backfaceSrc)} alt="" />
            </div> : null}
        </div>
    </div>;
}