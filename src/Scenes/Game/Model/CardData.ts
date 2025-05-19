import { Container, ContainerKey } from "../../../Utils/ArrayUtils";
import { CardColor, CardFilter, CardRank, CardSuit, DeckType, EffectType, EquipType, ExpansionType, ModifierType, MthType, PlayerFilter, TagType } from "./CardEnums";
import { TargetType } from "./CardTarget";

interface CardEffectBase<K extends ContainerKey> {
    target: TargetType;
    player_filter: Container<K, PlayerFilter>;
    card_filter: Container<K, CardFilter>;
    target_value: number;
    type: EffectType;
}

export type CardEffect = CardEffectBase<'set'>;
export type CardEffectArgs = CardEffectBase<'array'>;

export function parseCardEffect(effect: CardEffectArgs): CardEffect {
    return {
        ...effect,
        player_filter: new Set(effect.player_filter),
        card_filter: new Set(effect.card_filter)
    };
}

export interface CardEquip {
    type: EquipType;
}

export interface CardSign {
    suit: CardSuit;
    rank: CardRank;
}

interface CardDataBase<K extends ContainerKey> {
    name: string;
    image: string;
    effects: CardEffectBase<K>[];
    responses: CardEffectBase<K>[];
    equips: CardEquip[];
    tags: Record<TagType, number>;
    expansion: ExpansionType[];
    deck: DeckType;
    modifier: {
        type: ModifierType | null
    };
    modifier_response: {
        type: ModifierType | null
    };
    mth_effect: {
        type: MthType | null
    };
    mth_response: {
        type: MthType | null
    };
    equip_target: Container<K, PlayerFilter>;
    color: CardColor;
    sign: CardSign;
}

export type CardData = CardDataBase<'set'>;
export type CardDataArgs = CardDataBase<'array'>;

export function parseCardData(info: CardDataArgs): CardData {
    return {
        ...info,
        effects: info.effects.map(parseCardEffect),
        responses: info.responses.map(parseCardEffect),
        equip_target: new Set(info.equip_target)
    };
}