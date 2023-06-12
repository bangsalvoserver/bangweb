import { anyOf } from "../../../Utils/ArrayUtils";
import { CardColor, CardFilter, CardRank, CardSuit, CardTarget, DeckType, EffectType, EquipType, ExpansionType, ModifierType, MthType, PlayerFilter, TagType, TargetType } from "./CardEnums";
import { Card } from "./GameTable";

export interface CardEffect {
    target: TargetType;
    player_filter: PlayerFilter[];
    card_filter: CardFilter[];
    effect_value: number;
    target_value: number;
    type: EffectType;
}

export interface CardEquip {
    effect_value: number;
    type: EquipType;
}

export interface CardTag {
    tag_value: number;
    type: TagType;
}

export interface CardSign {
    suit: CardSuit;
    rank: CardRank;
}

export interface CardData {
    name: string;
    image: string;
    effects: CardEffect[];
    responses: CardEffect[];
    optionals: CardEffect[];
    equips: CardEquip[];
    tag_list: CardTag[];
    expansion: ExpansionType[];
    deck: DeckType;
    modifier: {
        type: ModifierType
    };
    mth_effect: {
        type: MthType
    };
    mth_response: {
        type: MthType
    };
    equip_target: PlayerFilter[];
    color: CardColor;
    sign: CardSign;
}

export function cardHasTag(card: Card, tagType: TagType) {
    return 'tag_list' in card.cardData && anyOf(card.cardData.tag_list, tag => tag.type == tagType);
}

export function getEquipTarget(card: Card): PlayerFilter[] {
    return 'equip_target' in card.cardData ? card.cardData.equip_target : [];
}

export type CardEffectPair = [CardEffect[], CardEffect[]];

export function getCardEffects(card: Card, isResponse: boolean): CardEffectPair {
    if ('effects' in card.cardData) {
        return [isResponse ? card.cardData.responses : card.cardData.effects, card.cardData.optionals];
    } else {
        return [[], []];
    }
}

export function getTargetIndex(targets: CardTarget[]) {
    if (targets.length != 0) {
        let lastTarget = Object.values(targets[targets.length - 1])[0];
        if (Array.isArray(lastTarget) && anyOf(lastTarget as number[], value => value == 0)) {
            return targets.length - 1;
        }
    }
    return targets.length;
}

export function getEffectHolder([effects, optionals]: CardEffectPair, index: number) {
    if (index < effects.length) {
        return effects[index];
    } else {
        return optionals[(index - effects.length) % optionals.length];
    }
}

export function zipCardTargets(targets: CardTarget[], [effects, optionals]: CardEffectPair) {
    let ret: [CardTarget, CardEffect][] = [];
    let index = 0;
    for (let effect of effects) {
        if (index >= effects.length) break;
        ret.push([targets[index++], effect]);
    }
    while (optionals.length != 0) {
        for (let effect of optionals) {
            if (index >= effects.length) break;
            ret.push([targets[index++], effect]);
        }
    }
    return ret;
}