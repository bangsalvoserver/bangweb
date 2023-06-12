import { CardFilter, PlayerFilter } from "./CardEnums";
import { Card, Player } from "./GameTable";
import { TargetSelector } from "./TargetSelector";

export function isEquipCard(card: Card) {
    switch (card.pocket?.name) {
    case 'player_hand':
    case 'shop_selection':
        return 'color' in card.cardData && card.cardData.color != 'brown';
    case 'train':
        return card.cardData.deck != 'locomotive';
    default:
        return false;
    }
}

export function checkPlayerFilter(selector: TargetSelector, filter: PlayerFilter[], player: Player) {
    // TODO
    return true;
}

export function checkCardFilter(selector: TargetSelector, filter: CardFilter[], card: Card) {
    // TODO
    return true;
}