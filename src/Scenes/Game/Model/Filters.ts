import { CardEffect, CardSign } from "./CardData";
import { CardColor, CardFilter, PlayerFilter, PocketType, TagType } from "./CardEnums";
import { Card, GameTable, getCard, getPlayer, isCardKnown, KnownCard, Player } from "./GameTable";
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

export function getEquipTarget(card: Card): PlayerFilter[] {
    return isCardKnown(card) ? card.cardData.equip_target : [];
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
    return player.status.flags.includes('dead');
}

export function isPlayerGhost(player: Player): boolean {
    return player.status.flags.some(flag =>
        flag === 'ghost_1' || flag === 'ghost_2' || flag === 'temp_ghost'
    );
}

export function isPlayerInGame(player: Player): boolean {
    return !isPlayerDead(player) || isPlayerGhost(player);
}

export function isBangCard(table: GameTable, origin: Player, card: Card): boolean {
    return table.status.flags.includes('treat_any_as_bang')
        || origin.status.flags.includes('treat_any_as_bang')
        || cardHasTag(card, 'bangcard')
        || (origin.status.flags.includes('treat_missed_as_bang') && cardHasTag(card, 'missed'));
}

export function calcPlayerDistance(table: GameTable, selector: TargetSelector, from: PlayerId, to: PlayerId): number {
    if (from === to) {
        return 0;
    }
    
    const distanceMod = selector.request?.distances.distance_mods.find(item => item.player === to)?.value ?? 0;

    if (table.status.flags.includes('disable_player_distances')) {
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

export function checkPlayerFilter(table: GameTable, selector: TargetSelector, filter: PlayerFilter[], target: Player): boolean {
    const origin = getPlayer(table, table.self_player!);

    if (isPlayerSelected(selector, target.id)) return false;

    if (!filter.includes('dead_or_alive')) {
        if (filter.includes('dead')) {
            if (!target.status.flags.includes('dead')) return false;
        } else {
            if (!isPlayerInGame(target)) return false;
        }
    }

    if (filter.includes('self') && target.id !== origin?.id) return false;
    if (filter.includes('notself') && target.id === origin?.id) return false;

    if (filter.includes('notorigin')) {
        if (!isResponse(selector) || selector.request.origin === target.id) {
            return false;
        }
    }

    if (filter.includes('notsheriff') && target.status.role === 'sheriff') return false;
    if (filter.includes('not_empty_hand') && target.pockets.player_hand.length === 0) return false;

    if (filter.includes('target_set') && isResponse(selector)) {
        if (!selector.request.target_set_players.includes(target.id)) {
            return false;
        }
    }

    if (!getModifierContext(selector, 'ignore_distances') && (filter.includes('reachable') || filter.includes('range_1') || filter.includes('range_2'))) {
        const distances = selector.request?.distances;
        
        let range = distances?.range_mod ?? 0;
        if (filter.includes('reachable')) {
            if (!distances?.weapon_range) {
                return false;
            }
            range += distances.weapon_range;
        } else if (filter.includes('range_1')) {
            ++range;
        } else if (filter.includes('range_2')) {
            range += 2;
        }

        if (calcPlayerDistance(table, selector, table.self_player!, target.id) > range) return false;
    }

    return true;
}

export function checkCardFilter(table: GameTable, selector: TargetSelector, filter: CardFilter[], target: Card): boolean {
    const origin = getPlayer(table, table.self_player!);

    if (isCardSelected(selector, target.id)) return false;

    if (!filter.includes('can_target_self') && isCardCurrent(selector, target)) return false;

    const targetPocket = getCardPocket(target);

    if (filter.includes('target_set')) {
        if (!isResponse(selector)) return false;
        switch (targetPocket) {
        case 'main_deck':
        case 'discard_pile':
            if (!selector.request.target_set_cards.some(pickCard => getCardPocket(getCard(table, pickCard)) === targetPocket)) {
                return false;
            }
            break;
        default:
            if (!selector.request.target_set_cards.includes(target.id)) {
                return false;
            }
        }
    } else if (filter.includes('cube_slot')) {
        switch (targetPocket) {
        case 'player_character': {
            const targetOwner = getCardOwner(target);
            if (!targetOwner || getPlayer(table, targetOwner)?.pockets.player_character[0] !== target.id) {
                return false;
            }
            break;
        }
        case 'player_table':
            if (getCardColor(target) !== 'orange') {
                return false;
            }
            break;
        default:
            return false;
        }
    } else {
        if (filter.includes('selection') !== (targetPocket === 'selection')) return false;

        switch (targetPocket) {
        case 'player_hand':
        case 'player_table':
        case 'selection':
            break;
        default:
            return false;
        }
    }

    if (filter.includes('beer') && !cardHasTag(target, 'beer')) return false;
    if (filter.includes('bang') && !isBangCard(table, origin, target)) return false;
    if (filter.includes('bangcard') && !cardHasTag(target, 'bangcard')) return false;
    if (filter.includes('not_bangcard') && cardHasTag(target, 'bangcard')) return false;
    if (filter.includes('missed') && !cardHasTag(target, 'missed')) return false;
    if (filter.includes('missedcard') && !cardHasTag(target, 'missedcard')) return false;
    if (filter.includes('not_missedcard') && cardHasTag(target, 'missedcard')) return false;
    if (filter.includes('bronco') && !cardHasTag(target, 'bronco')) return false;
    if (filter.includes('catbalou_panic') && !cardHasTag(target, 'catbalou_panic')) return false;

    const color = getCardColor(target);
    if (filter.includes('blue') && color !== 'blue') return false;
    if (filter.includes('train') && color !== 'train') return false;
    if (filter.includes('blue_or_train') && color !== 'blue' && color !== 'train') return false;
    if (filter.includes('black') !== (color === 'black')) return false;

    const sign = getCardSign(target);
    if (filter.includes('hearts') && sign.suit !== 'hearts') return false;
    if (filter.includes('diamonds') && sign.suit !== 'diamonds') return false;
    if (filter.includes('clubs') && sign.suit !== 'clubs') return false;
    if (filter.includes('spades') && sign.suit !== 'spades') return false;

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

    if (filter.includes('origin_card_suit')) {
        if (!isResponse(selector)) return false;
        if (!selector.request.origin_card) return false;
        const reqOriginCard = getCard(table, selector.request.origin_card);
        if (!(isCardKnown(reqOriginCard) && reqOriginCard.cardData.sign.suit === sign.suit)) return false;
    }

    if (filter.includes('table') && targetPocket !== 'player_table') return false;
    if (filter.includes('hand') && targetPocket !== 'player_hand') return false;

    return true;
}