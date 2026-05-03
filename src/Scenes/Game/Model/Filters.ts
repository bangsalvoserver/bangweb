import { CardSign } from "./CardData";
import { CardColor, CardFilter, PlayerFilter, PocketType, TagType } from "./CardEnums";
import { Card, GameTable, getCard, getPlayer, getPlayerCubes, getPlayerPocket, isCardKnown, KnownCard, Player } from "./GameTable";
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
    return ['dead', 'coffin']
        .some(flag => player.status.flags.has(flag));
}

export function isPlayerGhost(player: Player): boolean {
    return ['ghost', 'temp_ghost', 'shadow']
        .some(flag => player.status.flags.has(flag));
}

export function isPlayerInGame(player: Player): boolean {
    return !isPlayerDead(player) || isPlayerGhost(player);
}

export function isBangCard(origin: Player, card: Card): boolean {
    return origin.status.flags.has('treat_any_as_bang')
        || cardHasTag(card, 'bangcard')
        || (origin.status.flags.has('treat_missed_as_bang') && cardHasTag(card, 'missed'));
}

export function isMissedCard(origin: Player, card: Card): boolean {
    return origin.status.flags.has('treat_any_as_missed')
        || cardHasTag(card, 'missedcard')
        || (origin.status.flags.has('treat_missed_as_bang') && cardHasTag(card, 'bangcard'));
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
    return getPlayerPocket(player, 'player_hand').length === 0;
}

function isEmptyTable(table: GameTable, player: Player) {
    for (const cardId of getPlayerPocket(player, 'player_table')) {
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

function checkDistance(table: GameTable, selector: TargetSelector, target: Player, range: number) {
    const distances = selector.request?.distances;
    if (distances === undefined || range === 0) return false;
    if (getPlayer(table, table.self_player!).status.flags.has('ignore_distances')) return true;
    if (getModifierContext(selector, 'ignore_distances')) return true;
    const startPlayer = getModifierContext(selector, 'distance_start') ?? table.self_player!;
    return calcPlayerDistance(table, selector, startPlayer, target.id) <= (distances.range_mod + range);
}

type PlayerFilterFunction = (table: GameTable, selector: TargetSelector, target: Player) => boolean;

const PLAYER_FILTERS: Record<PlayerFilter, PlayerFilterFunction> = {
    'alive':            (table, selector, target) => isPlayerInGame(target),
    'dead':             (table, selector, target) => !isPlayerInGame(target),
    'self':             (table, selector, target) => target.id === table.self_player,
    'notself':          (table, selector, target) => target.id !== table.self_player,
    'notsheriff':       (table, selector, target) => target.status.role !== 'sheriff',
    'not_empty':        (table, selector, target) => !isEmptyHand(table, target) || !isEmptyTable(table, target),
    'not_empty_hand':   (table, selector, target) => !isEmptyHand(table, target),
    'not_empty_table':  (table, selector, target) => !isEmptyTable(table, target),
    'not_empty_cubes':  (table, selector, target) => !isEmptyCubes(table, target),
    'notorigin':        (table, selector, target) => isResponse(selector) && selector.request.origin !== target.id,
    'target_set':       (table, selector, target) => isResponse(selector) && selector.request.target_set_players.has(target.id),
    'reachable':        (table, selector, target) => checkDistance(table, selector, target, selector.request?.distances.weapon_range ?? 0),
    'range_1':          (table, selector, target) => checkDistance(table, selector, target, 1),
    'range_2':          (table, selector, target) => checkDistance(table, selector, target, 2),
}

export function checkPlayerFilter(table: GameTable, selector: TargetSelector, filter: PlayerFilter[], target: Player): boolean {
    if (isPlayerSelected(selector, target))
        return false;

    for (const value of filter) {
        const fn = PLAYER_FILTERS[value];
        if (fn && !fn(table, selector, target)) {
            return false;
        }
    }

    return true;
}

type CardFilterFunction = (table: GameTable, selector: TargetSelector, target: Card) => boolean;

const CARD_FILTERS: Record<CardFilter, CardFilterFunction> = {
    'bang':             (table, selector, target) => isBangCard(getPlayer(table, table.self_player!), target),
    'used_bang':        (table, selector, target) => isBangCard(getPlayer(table, table.self_player!), target) || table.status.flags.has('showdown'),
    'bangcard':         (table, selector, target) =>  cardHasTag(target, 'bangcard'),
    'not_bangcard':     (table, selector, target) => !cardHasTag(target, 'bangcard'),
    'missed':           (table, selector, target) =>  cardHasTag(target, 'missed'),
    'missedcard':       (table, selector, target) =>  cardHasTag(target, 'missedcard'),
    'not_missedcard':   (table, selector, target) => !cardHasTag(target, 'missedcard'),
    'bronco':           (table, selector, target) =>  cardHasTag(target, 'bronco'),
    'catbalou_panic':   (table, selector, target) =>  cardHasTag(target, 'catbalou_panic'),
    'beer':             (table, selector, target) =>  cardHasTag(target, 'beer'),
    'blue':             (table, selector, target) => getCardColor(target) === 'blue',
    'train':            (table, selector, target) => getCardColor(target) === 'train',
    'blue_or_train':    (table, selector, target) => ['blue','train'].includes(getCardColor(target)),
    'hearts':           (table, selector, target) => getCardSign(target).suit === 'hearts',
    'diamonds':         (table, selector, target) => getCardSign(target).suit === 'diamonds',
    'clubs':            (table, selector, target) => getCardSign(target).suit === 'clubs',
    'spades':           (table, selector, target) => getCardSign(target).suit === 'spades',
    'two_to_nine':      (table, selector, target) => ['rank_2','rank_3','rank_4','rank_5','rank_6','rank_7','rank_8','rank_9'].includes(getCardSign(target).rank),
    'ten_to_ace':       (table, selector, target) => ['rank_10','rank_J','rank_Q','rank_K','rank_A'].includes(getCardSign(target).rank),
    'table':            (table, selector, target) => getCardPocket(target) === 'player_table',
    'hand':             (table, selector, target) => getCardPocket(target) === 'player_hand',
    'not_self_hand':    (table, selector, target) => getCardPocket(target) !== 'player_hand' || getCardOwner(target) !== table.self_player,
    'target_set':       (table, selector, target) => isResponse(selector) && selector.request.target_set_cards.has(target.id),
    'origin_card_suit': (table, selector, target) => isResponse(selector) && selector.request.origin_card !== null && getCardSign(getCard(table, selector.request.origin_card)).suit === getCardSign(target).suit,
}

export function checkCardFilter(table: GameTable, selector: TargetSelector, filter: CardFilter[], target: Card): boolean {
    if (isCardSelected(selector, target) || isCardCurrent(selector, target)) return false;

    let hasTargetSet = false;
    let hasSelection = false;
    let hasBlack = false;

    for (const value of filter) {
        switch (value) {
        case 'target_set': hasTargetSet = true; break;
        case 'selection': hasSelection = true; break;
        case 'black': hasBlack = true; break;
        }
    }
    
    if (!hasTargetSet) {
        const targetPocket = getCardPocket(target);
        if (hasSelection !== (targetPocket === 'selection')) return false;
        if (!['player_hand','player_table','selection'].includes(targetPocket)) return false;
    }
    
    if (hasBlack !== (getCardColor(target) === 'black')) {
        return false;
    }

    for (const value of filter) {
        const fn = CARD_FILTERS[value];
        if (fn && !fn(table, selector, target)) {
            return false;
        }
    }

    return true;
}