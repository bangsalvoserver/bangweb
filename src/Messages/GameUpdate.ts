import { CardData } from "./CardData";

export interface AnimationUpdate {
    duration: number;
}

export interface FormatInteger { integer: number };
export interface FormatCard { card: number };
export interface FormatPlayer { player: number };
export type FormatArg = FormatInteger | FormatCard | FormatPlayer;

export interface GameString {
    format_str: string;
    format_args: FormatArg[];
}

export interface AddCardsUpdate {
    card_ids: {
        id: number,
        deck: string
    }[];
    pocket: string;
    player?: number;
}

export interface RemoveCardsUpdate {
    cards: number[];
}

export interface MoveCardUpdate extends AnimationUpdate {
    card: number;
    player?: number;
    pocket: string;
}

export interface AddCubesUpdate {
    num_cubes: number;
    target_card?: number;
}

export interface MoveCubesUpdate extends AnimationUpdate {
    num_cubes: number;
    origin_card?: number;
    target_card?: number;
}

export interface MoveScenarioDeckUpdate extends AnimationUpdate {
    player: number;
    pocket: string;
}

export interface MoveTrainUpdate extends AnimationUpdate {
    position: number;
}

export interface DeckShuffledUpdate extends AnimationUpdate {
    pocket: string;
}

export interface ShowCardUpdate extends AnimationUpdate {
    card: number;
    info: CardData;
}

export interface HideCardUpdate extends AnimationUpdate {
    card: number;
}

export interface TapCardUpdate extends AnimationUpdate {
    card: number;
    inactive: boolean;
}

export interface FlashCardUpdate extends AnimationUpdate {
    card: number;
}

export interface ShortPauseUpdate extends AnimationUpdate {
    card?: number;
}

export interface PlayerAddUpdate {
    players: {
        player_id: number,
        user_id: number
    }[];
}

export interface PlayerOrderUpdate extends AnimationUpdate {
    players: number[];
}

export interface PlayerHpUpdate extends AnimationUpdate {
    player: number;
    hp: number;
}

export interface PlayerGoldUpdate {
    player: number;
    gold: number;
}

export interface PlayerShowRoleUpdate extends AnimationUpdate {
    player: number;
    role: string;
}

export interface PlayerStatusUpdate {
    player: number;
    flags: string[];
    range_mod: number;
    weapon_range: number;
    distance_mod: number;
}

export interface CardNode {
    card: number;
    branches: CardNode[];
}

export interface RequestStatusArgs {
    origin_card?: number;
    origin?: number;
    target?: number;
    status_text: GameString;
    auto_select: boolean;
    respond_cards: CardNode[];
    pick_cards: number[];
    highlight_cards: number[];
}

export interface StatusReadyArgs {
    play_cards: CardNode[];
}

export interface GameOptions {
    expanions: string[];
    enable_ghost_cards: boolean;
    character_choice: boolean;
    allow_beer_in_duel: boolean;
    quick_discard_all: boolean;
    scenario_deck_size: boolean;
    num_bots: number;
    damage_timer: number;
    escape_timer: number;
    bot_play_timer: number;
    tumbleweed_timer: number;
}