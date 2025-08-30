export type CardSuit =
    'none' |
    'hearts' |
    'diamonds' |
    'clubs' |
    'spades';

export type CardRank =
    'none' |
    'rank_2' |
    'rank_3' |
    'rank_4' |
    'rank_5' |
    'rank_6' |
    'rank_7' |
    'rank_8' |
    'rank_9' |
    'rank_10' |
    'rank_J' |
    'rank_Q' |
    'rank_K' |
    'rank_A';


export type ExpansionType =
    'ghost_cards' |
    'dodgecity' |
    'goldrush' |
    'shadowgunslingers' |
    'armedanddangerous' |
    'greattrainrobbery' |
    'valleyofshadows' |
    'udolistinu' |
    'highnoon' |
    'fistfulofcards' |
    'wildwestshow_characters' |
    'wildwestshow' |
    'mostwanted' |
    'stickofdynamite' |
    'legends' |
    'canyondiablo' |
    'crazy_greygory';

export type DeckType =
    'none' |
    'main_deck' |
    'character' |
    'role' |
    'goldrush' |
    'highnoon' |
    'fistfulofcards' |
    'wildwestshow' |
    'station' |
    'locomotive' |
    'train' |
    'legends' |
    'feats';

export type CardColor =
    'none' |
    'brown' |
    'blue' |
    'green' |
    'black' |
    'orange' |
    'train';

export type PlayerPocketType =
    'player_hand' |
    'player_table' |
    'player_character';

export type TablePocketType =
    'main_deck' |
    'discard_pile' |
    'selection' |
    'shop_deck' |
    'shop_selection' |
    'hidden_deck' |
    'scenario_deck' |
    'scenario_card' |
    'wws_scenario_deck' |
    'wws_scenario_card' |
    'button_row' |
    'stations' |
    'train_deck' |
    'feats_deck' |
    'feats_discard' |
    'feats' |
    'train';

export type PocketType = 'none' | PlayerPocketType | TablePocketType;

export type PlayerRole =
    'unknown' |
    'sheriff' |
    'deputy' |
    'outlaw' |
    'renegade' |
    'deputy_3p' |
    'outlaw_3p' |
    'renegade_3p' |
    'shadow_deputy' |
    'shadow_outlaw';

export type TokenType =
    'gold' |
    'cube' |
    'fame1' |
    'fame2' |
    'fame3' |
    'fame4' |
    'fame5' |
    'fame6' |
    'fame7' |
    'fame8';

export type SoundId = string;

export type GameFlag = string;
export type PlayerFlag = string;

export type PlayerFilter = string;
export type CardFilter = string;
export type EffectType = string;
export type EquipType = string;
export type TagType = string;
export type ModifierType = string;
export type MthType = string;