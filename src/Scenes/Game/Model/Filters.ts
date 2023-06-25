import { CardSign } from "./CardData";
import { CardColor, CardFilter, PlayerFilter, TagType } from "./CardEnums";
import { Card, GameTable, KnownCard, Player, getCard, getPlayer, isCardKnown } from "./GameTable";
import { PlayingSelector, TargetSelector, isCardCurrent, isCardSelected, isPlayerSelected, isResponse } from "./TargetSelector";

export function getTagValue(card: Card, tagType: TagType): number | undefined {
    return isCardKnown(card) ? card.cardData.tags.find(tag => tag.type == tagType)?.tag_value : undefined;
}

export function cardHasTag(card: Card, tagType: TagType): boolean {
    return getTagValue(card, tagType) !== undefined;
}

export function getEquipTarget(card: Card): PlayerFilter[] {
    return isCardKnown(card) ? card.cardData.equip_target : [];
}

export function getCardColor(card: Card): CardColor {
    return isCardKnown(card) ? card.cardData.color : 'none';
}

export function getCardSign(card: Card): CardSign {
    return isCardKnown(card) ? card.cardData.sign : {rank: 'none', suit: 'none'};
}

export function isEquipCard(card: Card): boolean {
    switch (card.pocket?.name) {
    case 'player_hand':
    case 'shop_selection':
        return getCardColor(card) != 'brown';
    case 'train':
        return card.cardData.deck != 'locomotive';
    default:
        return false;
    }
}

export function isPlayerAlive(player: Player): boolean {
    return !player.status.flags.includes('dead')
        || player.status.flags.includes('ghost_1')
        || player.status.flags.includes('ghost_2')
        || player.status.flags.includes('temp_ghost')
}

export function isBangCard(table: GameTable, origin: Player, card: Card): boolean {
    return table.status.flags.includes('treat_any_as_bang')
        || cardHasTag(card, 'bangcard')
        || origin.status.flags.includes('treat_missed_as_bang')
        && cardHasTag(card, 'missed');
}

export function countDistance(table: GameTable, from: Player, to: Player): number {
    if (from.id == to.id) return 0;

    if (table.status.flags.includes('disable_player_distances')) {
        return 1 + to.status.distance_mod;
    }

    const fromIndex = table.alive_players.indexOf(from.id);
    const toIndex = table.alive_players.indexOf(to.id);

    let countLeft = 0;
    let countRight = 0;

    let i = fromIndex;
    while (i != toIndex) {
        ++i;
        if (i == table.alive_players.length) {
            i = 0;
        }
        if (isPlayerAlive(getPlayer(table, table.alive_players[i]))) {
            ++countLeft;
        }
    }
    while (i != fromIndex) {
        ++i;
        if (i == table.alive_players.length) {
            i = 0;
        }
        if (isPlayerAlive(getPlayer(table, table.alive_players[i]))) {
            ++countRight;
        }
    }

    return Math.min(countLeft, countRight) + to.status.distance_mod;
}

export function checkPlayerFilter(table: GameTable, selector: PlayingSelector, filter: PlayerFilter[], target: Player): boolean {
    const origin = getPlayer(table, table.self_player!);
    const context = selector.selection.context;

    if (isPlayerSelected(selector, target)) return false;

    if (filter.includes('dead')) {
        if (!filter.includes('alive') && !target.status.flags.includes('dead')) {
            return false;
        }
    } else if (!isPlayerAlive(target)) {
        return false;
    }

    if (filter.includes('self') && target.id != origin?.id) return false;
    if (filter.includes('notself') && target.id == origin?.id) return false;

    if (filter.includes('notorigin')) {
        if (!isResponse(selector) || selector.request.origin == target.id) {
            return false;
        }
    }

    if (filter.includes('notsheriff') && target.status.role == 'sheriff') return false;
    if (filter.includes('not_empty_hand') && target.pockets.player_hand.length == 0) return false;

    if (!context.ignore_distances && (filter.includes('reachable') || filter.includes('range_1') || filter.includes('range_2'))) {
        let range = origin.status.range_mod;
        if (filter.includes('reachable')) {
            range += origin.status.weapon_range;
        } else if (filter.includes('range_1')) {
            ++range;
        } else if (filter.includes('range_2')) {
            range += 2;
        }
        if (countDistance(table, origin, target) > range) return false;
    }

    return true;
}

export function checkCardFilter(table: GameTable, selector: TargetSelector, filter: CardFilter[], originCard: KnownCard, target: Card): boolean {
    const origin = getPlayer(table, table.self_player!);

    if (!filter.includes('can_repeat') && (isCardSelected(selector, target) || isCardCurrent(selector, target))) return false;

    if (!filter.includes('can_target_self') && originCard.id == target.id) return false;

    if (filter.includes('cube_slot')) {
        switch (target.pocket?.name) {
        case 'player_character': {
            const targetOwner = 'player' in target.pocket ? getPlayer(table, target.pocket.player) : undefined;
            if (targetOwner?.pockets.player_character[0] != target.id) {
                return false;
            }
            break;
        }
        case 'player_table':
            if (getCardColor(target) != 'orange') {
                return false;
            }
            break;
        default:
            return false;
        }
    } else if (target.cardData.deck == 'character') {
        return false;
    }

    if (filter.includes('beer') && !cardHasTag(target, 'beer')) return false;
    if (filter.includes('bang') && !isBangCard(table, origin, target)) return false;
    if (filter.includes('bangcard') && !cardHasTag(target, 'bangcard')) return false;
    if (filter.includes('missed') && !cardHasTag(target, 'missed')) return false;
    if (filter.includes('missedcard') && !cardHasTag(target, 'missedcard')) return false;
    if (filter.includes('bronco') && !cardHasTag(target, 'bronco')) return false;
    if (filter.includes('catbalou_panic') && !cardHasTag(target, 'cat_balou') && !cardHasTag(target, 'panic')) return false;

    const color = getCardColor(target);
    if (filter.includes('blue') && color != 'blue') return false;
    if (filter.includes('train') && color != 'train') return false;
    if (filter.includes('nottrain') && color == 'train') return false;
    if (filter.includes('blue_or_train') && color != 'blue' && color != 'train') return false;
    if (filter.includes('black') != (color == 'black')) return false;

    const sign = getCardSign(target);
    if (filter.includes('hearts') && sign.suit != 'hearts') return false;
    if (filter.includes('diamonds') && sign.suit != 'diamonds') return false;
    if (filter.includes('clubs') && sign.suit != 'clubs') return false;
    if (filter.includes('spades') && sign.suit != 'spades') return false;

    if (filter.includes('two_to_nine')) {
        switch (sign.rank) {
        case 'rank_2':
        case 'rank_3':
        case 'rank_4':
        case 'rank_5':
        case 'rank_6':
        case 'rank_7':
        case 'rank_8':
        case 'rank_9':
            break;
        default:
            return false;
        }
    }

    if (filter.includes('ten_to_ace')) {
        switch (sign.rank) {
        case 'rank_10':
        case 'rank_J':
        case 'rank_Q':
        case 'rank_K':
        case 'rank_A':
            break;
        default:
            return false;
        }
    }

    if (filter.includes('origin_card_suit') && isResponse(selector)) {
        if (!selector.request.origin_card) return false;
        const reqOriginCard = getCard(table, selector.request.origin_card);
        return isCardKnown(reqOriginCard) && reqOriginCard.cardData.sign.suit == sign.suit;
    }

    if (filter.includes('selection') && target.pocket?.name != 'selection') return false;
    if (filter.includes('table') && target.pocket?.name != 'player_table') return false;
    if (filter.includes('hand') && target.pocket?.name != 'player_hand') return false;

    return true;
}