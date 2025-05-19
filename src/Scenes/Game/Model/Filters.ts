import { CardEffect, CardSign } from "./CardData";
import { CardColor, CardFilter, PlayerFilter, PocketType, TagType } from "./CardEnums";
import { Card, GameTable, getCard, getPlayer, getPlayerCubes, isCardKnown, KnownCard, Player } from "./GameTable";
import { PlayerId } from "./GameUpdate";
import { getModifierContext, isCardCurrent, isCardSelected, isPlayerSelected, isResponse, TargetSelector } from "./TargetSelector";

export function getTagValue(card: Card, tagType: TagType): number | undefined {
    if (isCardKnown(card) && tagType in card.cardData.tags) {
        return card.cardData.tags[tagType];
    }
}

export function cardHasTag(card: Card, tagType: TagType): card is KnownCard {
    return getTagValue(card, tagType) !== undefined;
}

export function getEquipTarget(card: Card): Set<PlayerFilter> {
    return isCardKnown(card) ? card.cardData.equip_target : new Set();
}

export function getCardColor(card: Card): CardColor {
    return isCardKnown(card) ? card.cardData.color : 'none';
}

export function getCardSign(card: Card): CardSign {
    return isCardKnown(card) ? card.cardData.sign : {rank: 'none', suit: 'none'};
}

export function getCardPocket(card: Card): PocketType {
    return card.pocket?.name ?? 'none';
}

export function getCardOwner(card: Card): PlayerId | undefined {
    return card.pocket && 'player' in card.pocket ? card.pocket.player : undefined;
}

export function getCardEffects(card: KnownCard, isResponse: boolean): CardEffect[] {
    return isResponse ? card.cardData.responses : card.cardData.effects;
}

export function isCardModifier(card: KnownCard, isResponse: boolean): boolean {
    return (isResponse ? card.cardData.modifier_response.type : card.cardData.modifier.type) !== null;
}

export function isEquipCard(card: Card): boolean {
    switch (getCardPocket(card)) {
    case 'player_hand':
    case 'shop_selection':
        return getCardColor(card) !== 'brown';
    case 'train':
        return card.cardData.deck !== 'locomotive';
    default:
        return false;
    }
}

export function isPlayerDead(player: Player): boolean {
    return player.status.flags.has('dead');
}

export function isPlayerGhost(player: Player): boolean {
    return ['ghost_1', 'ghost_2', 'temp_ghost', 'shadow']
        .some(flag => player.status.flags.has(flag));
}

export function isPlayerInGame(player: Player): boolean {
    return !isPlayerDead(player) || isPlayerGhost(player);
}

export function isBangCard(table: GameTable, origin: Player, card: Card): boolean {
    return origin.status.flags.has('treat_any_as_bang')
        || cardHasTag(card, 'bangcard')
        || (origin.status.flags.has('treat_missed_as_bang') && cardHasTag(card, 'missed'));
}

export function calcPlayerDistance(table: GameTable, selector: TargetSelector, from: PlayerId, to: PlayerId): number {
    if (from === to) {
        return 0;
    }
    
    const distanceMod = selector.request?.distances.distance_mods.find(item => item.player === to)?.value ?? 0;

    if (table.status.flags.has('disable_player_distances')) {
        return 1 + distanceMod;
    }

    const fromIndex = table.alive_players.indexOf(from);
    const toIndex = table.alive_players.indexOf(to);

    let countCw = 0;
    let countCcw = 0;

    const playersInGame = table.alive_players.map(player => isPlayerInGame(getPlayer(table, player)));

    for (let i = fromIndex; i !== toIndex;) {
        if (playersInGame[i]) {
            ++countCw;
        }
        ++i;
        if (i === table.alive_players.length) {
            i = 0;
        }
    }
    for (let i = fromIndex; i !== toIndex;) {
        if (playersInGame[i]) {
            ++countCcw;
        }
        if (i === 0) {
            i = table.alive_players.length;
        }
        --i;
    }

    return Math.min(countCw, countCcw) + distanceMod;
}

function isEmptyHand(table: GameTable, player: Player) {
    return player.pockets.player_hand.length === 0;
}

function isEmptyTable(table: GameTable, player: Player) {
    for (const cardId of player.pockets.player_table) {
        const card = getCard(table, cardId);
        if (getCardColor(card) !== 'black') return false;
    }
    return true;
}

function isEmptyCubes(table: GameTable, player: Player) {
    for (const [, cubes] of getPlayerCubes(table, player)) {
        if (cubes !== 0) return false;
    }
    return true;
}

export function checkPlayerFilter(table: GameTable, selector: TargetSelector, filter: Set<PlayerFilter>, target: Player): boolean {
    const origin = getPlayer(table, table.self_player!);

    if (isPlayerSelected(selector, target)) return false;

    if (!filter.has('dead_or_alive')
        && filter.has('dead') === isPlayerInGame(target)
    ) {
        return false;
    }

    if (filter.has('self') && target.id !== origin?.id) return false;
    if (filter.has('notself') && target.id === origin?.id) return false;

    if (filter.has('notorigin')) {
        if (!isResponse(selector) || selector.request.origin === target.id) {
            return false;
        }
    }

    if (filter.has('notsheriff') && target.status.role === 'sheriff') return false;

    if (filter.has('not_empty_hand') && isEmptyHand(table, target)) return false;

    if (filter.has('not_empty_table') && isEmptyTable(table, target)) return false;

    if (filter.has('not_empty_cubes') && isEmptyCubes(table, target)) return false;

    if (filter.has('target_set') && isResponse(selector)) {
        if (!selector.request.target_set_players.has(target.id)) {
            return false;
        }
    }

    if (!getModifierContext(selector, 'ignore_distances')
        && !origin.status.flags.has('ignore_distances')
        && (filter.has('reachable') || filter.has('range_1') || filter.has('range_2'))
    ) {
        const distances = selector.request?.distances;
        
        let range = distances?.range_mod ?? 0;
        if (filter.has('reachable')) {
            if (!distances?.weapon_range) {
                return false;
            }
            range += distances.weapon_range;
        } else if (filter.has('range_1')) {
            ++range;
        } else if (filter.has('range_2')) {
            range += 2;
        }

        if (calcPlayerDistance(table, selector, origin.id, target.id) > range) return false;
    }

    return true;
}

export function checkCardFilter(table: GameTable, selector: TargetSelector, filter: Set<CardFilter>, target: Card): boolean {
    const origin = getPlayer(table, table.self_player!);

    if (isCardSelected(selector, target) || isCardCurrent(selector, target)) return false;

    const targetPocket = getCardPocket(target);
    const targetOwner = getCardOwner(target);

    if (filter.has('target_set')) {
        if (!isResponse(selector)) return false;
        switch (targetPocket) {
        case 'main_deck':
        case 'discard_pile':
            let found = false;
            for (const pickCard of selector.request.target_set_cards) {
                if (getCardPocket(getCard(table, pickCard)) === targetPocket) {
                    found = true;
                    break;
                }
            }
            if (!found) return false;
            break;
        default:
            if (!selector.request.target_set_cards.has(target.id)) {
                return false;
            }
        }
    } else {
        if (filter.has('selection') !== (targetPocket === 'selection')) return false;

        switch (targetPocket) {
        case 'player_hand':
        case 'player_table':
        case 'selection':
            break;
        default:
            return false;
        }
    }

    if (filter.has('beer') && !cardHasTag(target, 'beer')) return false;
    if (filter.has('bang') && !isBangCard(table, origin, target)) return false;
    if (filter.has('used_bang') && !(table.status.flags.has('showdown') || isBangCard(table, origin, target))) return false;
    if (filter.has('bangcard') && !cardHasTag(target, 'bangcard')) return false;
    if (filter.has('not_bangcard') && cardHasTag(target, 'bangcard')) return false;
    if (filter.has('missed') && !cardHasTag(target, 'missed')) return false;
    if (filter.has('missedcard') && !cardHasTag(target, 'missedcard')) return false;
    if (filter.has('not_missedcard') && cardHasTag(target, 'missedcard')) return false;
    if (filter.has('bronco') && !cardHasTag(target, 'bronco')) return false;
    if (filter.has('catbalou_panic') && !cardHasTag(target, 'catbalou_panic')) return false;

    const color = getCardColor(target);
    if (filter.has('blue') && color !== 'blue') return false;
    if (filter.has('train') && color !== 'train') return false;
    if (filter.has('blue_or_train') && color !== 'blue' && color !== 'train') return false;
    if (filter.has('black') !== (color === 'black')) return false;

    const sign = getCardSign(target);
    if (filter.has('hearts') && sign.suit !== 'hearts') return false;
    if (filter.has('diamonds') && sign.suit !== 'diamonds') return false;
    if (filter.has('clubs') && sign.suit !== 'clubs') return false;
    if (filter.has('spades') && sign.suit !== 'spades') return false;

    if (filter.has('two_to_nine')) {
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

    if (filter.has('ten_to_ace')) {
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

    if (filter.has('origin_card_suit')) {
        if (!isResponse(selector)) return false;
        if (!selector.request.origin_card) return false;
        const reqOriginCard = getCard(table, selector.request.origin_card);
        if (!(isCardKnown(reqOriginCard) && reqOriginCard.cardData.sign.suit === sign.suit)) return false;
    }

    if (filter.has('table') && targetPocket !== 'player_table') return false;
    if (filter.has('hand') && targetPocket !== 'player_hand') return false;
    if (filter.has('not_self_hand') && targetPocket === 'player_hand' && targetOwner === table.self_player) return false;

    return true;
}