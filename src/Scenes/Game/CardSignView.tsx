import { CardSign } from "../../Messages/CardData";

export interface CardSignProps {
    sign: CardSign;
}

export default function CardSignView({ sign }: CardSignProps) {
    if (sign.rank != 'none' && sign.suit != 'none') {
        return (<>
            <img src={`/cards/misc/${sign.rank}.png`}/>
            <img src={`/cards/misc/suit_${sign.suit}.png`}/>
        </>);
    } else {
        return null;
    }
}