import { CardSign } from "./CardData";
import { CardColor, CardFilter, PlayerFilter, TagType } from "./CardEnums";
import { Card, GameTable, KnownCard, Player, getCard, getPlayer, isCardKnown } from "./GameTable";
import { PlayerId } from "./GameUpdate";
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

export function isPlayerDead(player: Player): boolean {
    return player.status.flags.includes('dead');
}

export function isPlayerGhost(player: Player): boolean {
    return player.status.flags.some(flag =>
        flag == 'ghost_1' || flag == 'ghost_2' || flag == 'temp_ghost'
    );
}

export function isBangCard(table: GameTable, origin: Player, card: Card): boolean {
    return table.status.flags.includes('treat_any_as_bang')
        || cardHasTag(card, 'bangcard')
        || origin.status.flags.includes('treat_missed_as_bang')
        && cardHasTag(card, 'missed');
}

export function calcPlayerDistance(selector: PlayingSelector, from: PlayerId, to: PlayerId): number {
    const table = selector.table.current;
    if (table.status.flags.includes('disable_player_distances')) {
        return 1;
    }

    const fromIndex = table.alive_players.indexOf(from);
    const toIndex = table.alive_players.indexOf(to);

    let countCw = 0;
    let countCcw = 0;

    const playersAlive = table.alive_players.map(player => !isPlayerDead(getPlayer(table, player)));

    for (let i = fromIndex; i != toIndex;) {
        if (playersAlive[i]) {
            ++countCw;
        }
        ++i;
        if (i == table.alive_players.length) {
            i = 0;
        }
    }
    for (let i = fromIndex; i != toIndex;) {
        if (playersAlive[i]) {
            ++countCcw;
        }
        if (i == 0) {
            i = table.alive_players.length;
        }
        --i;
    }

    return Math.min(countCw, countCcw);
}

export function checkPlayerFilter(selector: PlayingSelector, filter: PlayerFilter[], target: Player): boolean {
    const table = selector.table.current;
    const origin = getPlayer(table, table.self_player!);
    const context = selector.selection.context;

    if (isPlayerSelected(selector, target)) return false;

    if (filter.includes('dead')) {
        if (!filter.includes('alive') && !target.status.flags.includes('dead')) {
            return false;
        }
    } else if (isPlayerDead(target) && !isPlayerGhost(target)) {
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

    if (filter.includes('target_set') && isResponse(selector)) {
        if (!selector.request.target_set.find(t => 'player' in t && t.player == target.id)) {
            return false;
        }
    }

    if (!context.ignore_distances && (filter.includes('reachable') || filter.includes('range_1') || filter.includes('range_2'))) {
        const distances = selector.request.distances;
        let range = distances.range_mod;
        if (filter.includes('reachable')) {
            if (distances.weapon_range == 0) {
                return false;
            }
            range += distances.weapon_range;
        } else if (filter.includes('range_1')) {
            ++range;
        } else if (filter.includes('range_2')) {
            range += 2;
        }

        const distanceMod = distances.distances.find(item => item.player == target.id)?.distance ?? 0;
        if (calcPlayerDistance(selector, table.self_player!, target.id) + distanceMod > range) return false;
    }

    return true;
}

export function checkCardFilter(selector: TargetSelector, filter: CardFilter[], target: Card): boolean {
    const table = selector.table.current;
    const origin = getPlayer(table, table.self_player!);

    if (!filter.includes('can_repeat') && isCardSelected(selector, target.id)) return false;

    if (!filter.includes('can_target_self') && isCardCurrent(selector, target)) return false;

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
    if (filter.includes('not_bangcard') && cardHasTag(target, 'bangcard')) return false;
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
        if (!(isCardKnown(reqOriginCard) && reqOriginCard.cardData.sign.suit == sign.suit)) return false;
    }

    if (filter.includes('selection') && target.pocket?.name != 'selection') return false;
    if (filter.includes('table') && target.pocket?.name != 'player_table') return false;
    if (filter.includes('hand') && target.pocket?.name != 'player_hand') return false;

    return true;
}