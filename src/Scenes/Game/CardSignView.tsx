import { getCardUrl } from "./CardView";
import { CardSign } from "./Model/CardData";

export interface CardSignProps {
    sign: CardSign;
}

export default function CardSignView({ sign }: CardSignProps) {
    if (sign.rank != 'none' && sign.suit != 'none') {
        return (<>
            <img src={getCardUrl('misc/' + sign.rank)}/>
            <img src={getCardUrl('misc/suit_' + sign.suit)}/>
        </>);
    } else {
        return null;
    }
}