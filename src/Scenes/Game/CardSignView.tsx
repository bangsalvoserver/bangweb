import { CardSign } from "./Model/CardData";

export interface CardSignProps {
    sign: CardSign;
}

export default function CardSignView({ sign }: CardSignProps) {
    if (sign.rank != 'none' && sign.suit != 'none') {
        const rankSrc = `/cards/misc/${sign.rank}.png`;
        const suitSrc = `/cards/misc/suit_${sign.suit}.png`;
        return <><img src={rankSrc} /><img src={suitSrc} /></>;
    } else {
        return null;
    }
}