import { CSSProperties, useRef } from "react";
import { CardImageView } from "./CardView";
import { PlayerRole } from "./Model/CardEnums";
import { CardImage, Player } from "./Model/GameTable";
import useCardOverlay from "./Model/UseCardOverlay";
import "./Style/CardView.css";

export interface RoleProps {
    player: Player;
}

const SUFFIX_3P = '_3p';

function getRoleImage(role: PlayerRole): CardImage {
    const name = 'ROLE_' + role.toUpperCase();
    let image = 'role/' + role;
    if (role === 'unknown') {
        image = 'backface/role';
    } else if (role.endsWith(SUFFIX_3P)) {
        image = 'role/' + role.substring(0, role.length - SUFFIX_3P.length);
    }
    return { name, image };
}

export default function RoleView({ player }: RoleProps) {
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

    const frontfaceImage = getRoleImage(frontRole);

    useCardOverlay(frontfaceImage, divRef);

    return <div className='pocket-view'>
        <div key={animationKey} ref={divRef} style={style} className={classes.join(' ')}>
            <div className="card-front">
                <CardImageView {...frontfaceImage} />
            </div>
            {animationKey ? <div className="card-back-flip">
                <CardImageView {...getRoleImage(backRole)} />
            </div> : null}
        </div>
    </div>;
}