export interface CardEffect {
    target: string;
    player_filter: string;
    card_filter: string;
    effect_value: number;
    target_value: number;
    type: string;
}

export interface CardEquip {
    effect_value: number;
    type: string;
}

export interface CardTag {
    tag_value: number;
    type: string;
}

export interface CardData {
    name: string;
    image: string;
    effects: CardEffect[];
    responses: CardEffect[];
    optionals: CardEffect[];
    equips: CardEquip[];
    tag_list: CardTag[];
    expansion: string;
    deck: string;
    modifier: {
        type: string
    };
    mth_effect: {
        type: string
    };
    mth_response: {
        type: string
    };
    equip_target: string;
    color: string;
    sign: {
        suit: string;
        rank: string;
    };
}