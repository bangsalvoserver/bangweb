import { CardColor, CardRank, CardSuit, DeckType, EquipType, ExpansionType, ModifierType, MthType, PlayerFilter, TagType } from "./CardEnums";
import { CardEffect } from "./CardTarget";

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