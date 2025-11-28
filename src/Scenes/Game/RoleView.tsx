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

export function getRoleImage(role: PlayerRole): string {
    if (role === 'unknown') {
        return 'backface/role';
    } else if (role.endsWith(SUFFIX_3P)) {
        return 'role/' + role.substring(0, role.length - SUFFIX_3P.length);
    } else {
        return 'role/' + role;
    }
}

function getRoleCardImage(role: PlayerRole): CardImage {
    return {
        name: 'ROLE_' + role.toUpperCase(),
        image: getRoleImage(role)
    };
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

    const frontfaceImage = getRoleCardImage(frontRole);

    useCardOverlay(frontfaceImage, divRef);

    return <div className='pocket-view'>
        <div key={animationKey} ref={divRef} style={style} className={classes.join(' ')}>
            <CardImageView className="card-front" cardImage={frontfaceImage} />
            {animationKey ? <CardImageView className="card-back-flip" cardImage={getRoleCardImage(backRole)} /> : null}
        </div>
    </div>;
}