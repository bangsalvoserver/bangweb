import { getCardUrl } from "./CardView";
import { CardSign } from "./Model/CardData";
import { CardRank, CardSuit } from "./Model/CardEnums";

export interface CardSignProps {
    sign: CardSign;
}

function getRankAlt(rank: CardRank) {
    switch (rank) {
    case 'rank_2':  return "2";
    case 'rank_3':  return "3";
    case 'rank_4':  return "4";
    case 'rank_5':  return "5";
    case 'rank_6':  return "6";
    case 'rank_7':  return "7";
    case 'rank_8':  return "8";
    case 'rank_9':  return "9";
    case 'rank_10': return "10";
    case 'rank_J':  return "J";
    case 'rank_Q':  return "Q";
    case 'rank_K':  return "K";
    case 'rank_A':  return "A";
    default:        return "";
    }
}

function getSuitAlt(suit: CardSuit) {
    switch (suit) {
    case 'hearts':      return "♥️";
    case 'diamonds':    return "♦️";
    case 'clubs':       return "♣️";
    case 'spades':      return "♠️";
    default:            return "";
    }
}

export default function CardSignView({ sign }: CardSignProps) {
    if (sign.rank !== 'none' && sign.suit !== 'none') {
        return <>
            <img className="inline" src={getCardUrl('misc/' + sign.rank)} alt={getRankAlt(sign.rank)} />
            <img className="inline" src={getCardUrl('misc/suit_' + sign.suit)} alt={getSuitAlt(sign.suit)} />
        </>;
    } else {
        return null;
    }
}