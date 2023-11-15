import { Empty, UserId } from "../../../Messages/ServerMessage";
import { CardData, CardSign } from "./CardData";
import { CardTarget, DeckType, ExpansionType, GameFlag, PlayerFlag, PlayerRole, PocketType } from "./CardEnums";

export type CardId = number;
export type PlayerId = number;
export type Milliseconds = number;

export interface Duration {
    duration: Milliseconds;
}

export interface FormatInteger { integer: number };
export interface FormatCardName { name: string, sign: CardSign };
export interface FormatCard { card: FormatCardName | Empty };
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
    player: PlayerId | null;
}

export interface RemoveCardsUpdate {
    cards: CardId[];
}

export interface MoveCardUpdate {
    card: CardId;
    player: PlayerId | null;
    pocket: PocketType;
}

export interface AddCubesUpdate {
    num_cubes: number;
    target_card: CardId | null;
}

export interface MoveCubesUpdate {
    num_cubes: number;
    origin_card: CardId | null;
    target_card: CardId | null;
}

export interface MoveTrainUpdate {
    position: number;
}

export interface DeckShuffledUpdate {
    pocket: 'main_deck' | 'shop_deck';
}

export interface ShowCardUpdate {
    card: CardId;
    info: CardData;
}

export interface HideCardUpdate {
    card: CardId;
}

export interface TapCardUpdate {
    card: CardId;
    inactive: boolean;
}

export interface FlashCardUpdate {
    card: CardId;
}

export interface ShortPauseUpdate {
    card: CardId | null;
}

export interface PlayerAddUpdate {
    players: {
        player_id: PlayerId,
        user_id: UserId
    }[];
}

export interface PlayerOrderUpdate {
    players: PlayerId[];
}

export interface PlayerHpUpdate {
    player: PlayerId;
    hp: number;
}

export interface PlayerGoldUpdate {
    player: PlayerId;
    gold: number;
}

export interface PlayerShowRoleUpdate {
    player: PlayerId;
    role: PlayerRole;
}

export interface PlayerFlagsUpdate {
    player: PlayerId;
    flags: PlayerFlag[];
}

export interface CardNode {
    card: CardId;
    branches: CardNode[];
}

export interface PlayerDistances {
    distances: { player: PlayerId, distance: number }[];
    range_mod: number;
    weapon_range: number;
}

export interface TimerStatusArgs {
    timer_id: number;
    duration: Duration;
}

export interface RequestStatusArgs {
    origin_card: CardId | null;
    origin: PlayerId | null;
    target: PlayerId | null;
    status_text: GameString;
    auto_select: boolean;
    respond_cards: CardNode[];
    pick_cards: CardId[];
    highlight_cards: CardId[];
    distances: PlayerDistances;
    target_set: CardTarget[];
    timer: TimerStatusArgs | null;
}

export interface StatusReadyArgs {
    play_cards: CardNode[];
    distances: PlayerDistances;
}

export interface GameOptions {
    expansions: ExpansionType[];
    enable_ghost_cards: boolean;
    character_choice: boolean;
    allow_beer_in_duel: boolean;
    quick_discard_all: boolean;
    scenario_deck_size?: number;
    num_bots?: number;
    damage_timer?: Milliseconds;
    escape_timer?: Milliseconds;
    bot_play_timer?: Milliseconds;
    tumbleweed_timer?: Milliseconds;
    game_seed?: number;
}

export type GameUpdate =
    { game_error: GameString } |
    { game_log: GameString } |
    { game_prompt: GameString } |
    { play_sound: string } |
    { add_cards: AddCardsUpdate } |
    { remove_cards: RemoveCardsUpdate } |
    { player_add: PlayerAddUpdate } |
    { player_order: PlayerOrderUpdate & Duration } |
    { player_order_end: PlayerOrderUpdate } |
    { player_hp: PlayerHpUpdate & Duration } |
    { player_gold: PlayerGoldUpdate } |
    { player_show_role: PlayerShowRoleUpdate & Duration } |
    { player_animation_end: PlayerId } |
    { player_flags: PlayerFlagsUpdate } |
    { switch_turn: PlayerId } |
    { move_card: MoveCardUpdate & Duration } |
    { move_card_end: MoveCardUpdate } |
    { deck_shuffled: DeckShuffledUpdate & Duration } |
    { deck_shuffled_end: DeckShuffledUpdate } |
    { show_card: ShowCardUpdate & Duration } |
    { hide_card: HideCardUpdate & Duration } |
    { tap_card: TapCardUpdate & Duration } |
    { flash_card: FlashCardUpdate & Duration } |
    { short_pause: ShortPauseUpdate & Duration } |
    { card_animation_end: CardId } |
    { add_cubes: AddCubesUpdate } |
    { move_cubes: MoveCubesUpdate & Duration } |
    { move_cubes_end: MoveCubesUpdate } |
    { move_train: MoveTrainUpdate & Duration } |
    { move_train_end: MoveTrainUpdate } |
    { game_flags: GameFlag[] } |
    { request_status: RequestStatusArgs } | 
    { status_ready: StatusReadyArgs } |
    { status_clear: Empty } |
    { clear_logs: Empty };