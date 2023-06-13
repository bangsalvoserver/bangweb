import { cardHasTag } from "./CardData";
import { CardFilter, PlayerFilter } from "./CardEnums";
import { Card, Player, getPlayer } from "./GameTable";
import { PlayerId } from "./GameUpdate";
import { EffectContext, TargetSelector } from "./TargetSelector";

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

export function isPlayerGhost(player: Player) {
    return player.status.flags.includes('ghost_1')
        || player.status.flags.includes('ghost_2')
        || player.status.flags.includes('temp_ghost');
}

export function isPlayerAlive(player: Player) {
    return !player.status.flags.includes('dead') || isPlayerGhost(player);
}

export function checkPlayerFilter(selector: TargetSelector, filter: PlayerFilter[], origin: Player, target: Player, context: EffectContext) {
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
        if (!('origin' in selector.request) || selector.request.origin == target.id) {
            return false;
        }
    }

    const countDistance = () => {
        // TODO
        return 0;
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
        if (countDistance() > range) return false;
    }

    return true;
}

export function checkCardFilter(selector: TargetSelector, filter: CardFilter[], origin: Player, originCard: Card, target: Card, context: EffectContext) {
    if (!filter.includes('can_target_self') && originCard.id == target.id) return false;

    const isTargetCubeSlot = () => {
        // TODO
        return true;
    };

    const isTargetBangCard = () => {
        // TODO
        return true;
    }

    if (filter.includes('cube_slot')) {
        if (!isTargetCubeSlot()) return false;
    } else if (target.cardData.deck == 'character') {
        return false;
    }

    if (filter.includes('beer') && !cardHasTag(target, 'beer')) return false;
    if (filter.includes('bang') && !isTargetBangCard()) return false;
    if (filter.includes('bangcard') && !cardHasTag(target, 'bangcard')) return false;
    if (filter.includes('missed') && !cardHasTag(target, 'missed')) return false;
    if (filter.includes('missedcard') && !cardHasTag(target, 'missedcard')) return false;
    if (filter.includes('bronco') && !cardHasTag(target, 'bronco')) return false;
    if (filter.includes('catbalou_panic') && !cardHasTag(target, 'cat_balou') && !cardHasTag(target, 'panic')) return false;

    if ('color' in target.cardData) {
        const color = target.cardData.color;
        if (filter.includes('blue') && color != 'blue') return false;
        if (filter.includes('train') && color != 'train') return false;
        if (filter.includes('nottrain') && color == 'train') return false;
        if (filter.includes('blue_or_train') && color != 'blue' && color != 'train') return false;
        if (filter.includes('black') != (color == 'black')) return false;

        const sign = target.cardData.sign;
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
    }

    if (filter.includes('origin_card_suit')) {
        // TODO
    }

    if (filter.includes('selection') && target.pocket?.name != 'selection') return false;
    if (filter.includes('table') && target.pocket?.name != 'player_table') return false;
    if (filter.includes('hand') && target.pocket?.name != 'player_hand') return false;

    return true;
}