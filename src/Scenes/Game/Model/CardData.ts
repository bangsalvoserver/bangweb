import { CardColor, CardFilter, CardRank, CardSuit, DeckType, EffectType, EquipType, ExpansionType, ModifierType, MthType, PlayerFilter, TagType } from "./CardEnums";
import { TargetType } from "./CardTarget";

export interface CardEffect {
    target: TargetType;
    player_filter: PlayerFilter[];
    card_filter: CardFilter[];
    target_value: number;
    type: EffectType;
}

export interface CardEquip {
    type: EquipType;
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
    equip_target: PlayerFilter[];
    color: CardColor;
    sign: CardSign;
}