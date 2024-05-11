import { CSSProperties, useMemo, useRef } from "react";
import getLabel from "../../Locale/GetLabel";
import { getCardUrl } from "./CardView";
import { PlayerRole } from "./Model/CardEnums";
import useCardOverlay from "./Model/UseCardOverlay";
import "./Style/CardView.css";
import { CardImage } from "./Model/GameTable";
import { Milliseconds } from "../../Model/ServerMessage";

export interface RoleProps {
    role: PlayerRole;
    flipDuration?: Milliseconds;
}

export default function RoleView({ role, flipDuration }: RoleProps) {
    const divRef = useRef<HTMLDivElement>(null);

    const [backfaceSrc, cardImage, cardAlt] = useMemo(() => {
        const backfaceSrc = 'backface/role';
        const cardImage: CardImage = { image: role === 'unknown' ? backfaceSrc : 'role/' + role };
        const cardAlt = getLabel('PlayerRole', role);
        return [backfaceSrc, cardImage, cardAlt] as const;
    }, [role]);

    useCardOverlay(cardImage, cardAlt, divRef);

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
                <img className="card-view-img" src={getCardUrl(cardImage.image)} alt={cardAlt} />
            </div>
            {flipDuration ? <div className="card-back-flip">
                <img className="card-view-img" src={getCardUrl(backfaceSrc)} alt="" />
            </div> : null}
        </div>
    </div>;
}