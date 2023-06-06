import { UserId } from "../../../Messages/ServerMessage";
import { CardData, CardSign } from "./CardData";
import { DeckType, ExpansionType, PlayerFlag, PlayerRole, PocketType, ScenarioDeckPocket } from "./CardEnums";

export type CardId = number;
export type PlayerId = number;
export type Milliseconds = number;

export interface AnimationUpdate {
    duration: Milliseconds;
}

export interface FormatInteger { integer: number };
export interface FormatCard { card: { name: string, sign: CardSign } | {} };
export interface FormatPlayer { player: PlayerId | null };
export type FormatArg = FormatInteger | FormatCard | FormatPlayer;

export interface GameString {
    format_str: string;
    format_args: FormatArg[];
}

export interface AddCardsUpdate {
    card_ids: {
        id: CardId,
        deck: DeckType
    }[];
    pocket: PocketType;
    player?: PlayerId;
}

export interface RemoveCardsUpdate {
    cards: CardId[];
}

export interface MoveCardUpdate extends AnimationUpdate {
    card: CardId;
    player?: PlayerId;
    pocket: PocketType;
}

export interface AddCubesUpdate {
    num_cubes: number;
    target_card?: CardId;
}

export interface MoveCubesUpdate extends AnimationUpdate {
    num_cubes: number;
    origin_card?: CardId;
    target_card?: CardId;
}

export interface MoveScenarioDeckUpdate extends AnimationUpdate {
    player: PlayerId;
    pocket: ScenarioDeckPocket;
}

export interface MoveTrainUpdate extends AnimationUpdate {
    position: number;
}

export interface DeckShuffledUpdate extends AnimationUpdate {
    pocket: 'main_deck' | 'shop_deck';
}

export interface ShowCardUpdate extends AnimationUpdate {
    card: CardId;
    info: CardData;
}

export interface HideCardUpdate extends AnimationUpdate {
    card: CardId;
}

export interface TapCardUpdate extends AnimationUpdate {
    card: CardId;
    inactive: boolean;
}

export interface FlashCardUpdate extends AnimationUpdate {
    card: CardId;
}

export interface ShortPauseUpdate extends AnimationUpdate {
    card?: CardId;
}

export interface PlayerAddUpdate {
    players: {
        player_id: PlayerId,
        user_id: UserId
    }[];
}

export interface PlayerOrderUpdate extends AnimationUpdate {
    players: PlayerId[];
}

export interface PlayerHpUpdate extends AnimationUpdate {
    player: PlayerId;
    hp: number;
}

export interface PlayerGoldUpdate {
    player: PlayerId;
    gold: number;
}

export interface PlayerShowRoleUpdate extends AnimationUpdate {
    player: PlayerId;
    role: PlayerRole;
}

export interface PlayerStatusUpdate {
    player: PlayerId;
    flags: PlayerFlag[];
    range_mod: number;
    weapon_range: number;
    distance_mod: number;
}

export interface CardNode {
    card: CardId;
    branches: CardNode[];
}

export interface RequestStatusArgs {
    origin_card?: CardId;
    origin?: PlayerId;
    target?: PlayerId;
    status_text: GameString;
    auto_select: boolean;
    respond_cards: CardNode[];
    pick_cards: CardId[];
    highlight_cards: CardId[];
}

export interface StatusReadyArgs {
    play_cards: CardNode[];
}

export interface CardIdUpdate {
    card?: CardId;
}

export interface PlayerIdUpdate {
    player?: CardId;
}

export interface GameOptions {
    expansions: ExpansionType[];
    enable_ghost_cards: boolean;
    character_choice: boolean;
    allow_beer_in_duel: boolean;
    quick_discard_all: boolean;
    scenario_deck_size: number;
    num_bots: number;
    damage_timer: Milliseconds;
    escape_timer: Milliseconds;
    bot_play_timer: Milliseconds;
    tumbleweed_timer: Milliseconds;
}

export interface GameUpdate {
    updateType: string,
    updateValue?: any
}