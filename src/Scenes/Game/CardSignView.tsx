import { getCardUrl } from "./CardView";
import { CardSign } from "./Model/CardData";

export interface CardSignProps {
    sign: CardSign;
}

export default function CardSignView({ sign }: CardSignProps) {
    if (sign.rank !== 'none' && sign.suit !== 'none') {
        const rankSrc = getCardUrl('misc/' + sign.rank);
        const suitSrc = getCardUrl('misc/suit_' + sign.suit);
        return <><img src={rankSrc} alt="" /><img src={suitSrc} alt="" /></>;
    } else {
        return null;
    }
}