import { Empty, Milliseconds, UserId } from "../../../Model/ServerMessage";
import { CardData, CardSign } from "./CardData";
import { DeckType, ExpansionType, GameFlag, PlayerFlag, PlayerRole, PocketType } from "./CardEnums";

export type CardId = number;
export type PlayerId = number;

export interface Duration {
    duration: Milliseconds;
}

export type FormatArg = 
    { integer: number } |
    { card: { name?: string, sign?: CardSign }} |
    { player: PlayerId };

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
    front: boolean;
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

export interface PlayerDistances {
    distance_mods: { player: PlayerId, value: number }[];
    range_mod: number;
    weapon_range: number;
}

export interface TimerStatusArgs {
    timer_id: number;
    duration: Milliseconds;
}

export type EffectContext = Partial<{
    playing_card: CardId,
    repeat_card: CardId,
    card_choice: CardId,
    train_advance: number,
    ignore_distances: boolean,
}>;

export interface PlayableCardInfo {
    card: CardId;
    modifiers: CardId[];
    context: EffectContext | null;
}

export interface RequestStatusArgs {
    origin_card: CardId | null;
    origin: PlayerId | null;
    target: PlayerId | null;
    status_text: GameString;
    respond_cards: PlayableCardInfo[];
    highlight_cards: CardId[];
    distances: PlayerDistances;
    target_set_players: PlayerId[];
    target_set_cards: CardId[];
    timer: TimerStatusArgs | null;
}

export interface StatusReadyArgs {
    play_cards: PlayableCardInfo[];
    distances: PlayerDistances;
}

export interface GameOptions {
    expansions: ExpansionType[];
    enable_ghost_cards: boolean;
    character_choice: boolean;
    allow_beer_in_duel: boolean;
    quick_discard_all: boolean;
    auto_pick_predraw: boolean;
    scenario_deck_size?: number;
    num_bots?: number;
    damage_timer?: Milliseconds;
    escape_timer?: Milliseconds;
    bot_play_timer?: Milliseconds;
    tumbleweed_timer?: Milliseconds;
    game_seed?: number;
}

export type GameTableUpdate = 
    { add_cards: AddCardsUpdate } |
    { remove_cards: RemoveCardsUpdate } |
    { player_add: PlayerAddUpdate } |
    { player_order: PlayerOrderUpdate & Duration } |
    { player_hp: PlayerHpUpdate & Duration } |
    { player_gold: PlayerGoldUpdate } |
    { player_show_role: PlayerShowRoleUpdate & Duration } |
    { player_flags: PlayerFlagsUpdate } |
    { switch_turn: PlayerId } |
    { move_card: MoveCardUpdate & Duration } |
    { deck_shuffled: DeckShuffledUpdate & Duration } |
    { show_card: ShowCardUpdate & Duration } |
    { hide_card: HideCardUpdate & Duration } |
    { tap_card: TapCardUpdate & Duration } |
    { flash_card: FlashCardUpdate & Duration } |
    { short_pause: ShortPauseUpdate & Duration } |
    { add_cubes: AddCubesUpdate } |
    { move_cubes: MoveCubesUpdate & Duration } |
    { move_train: MoveTrainUpdate & Duration } |
    { game_flags: GameFlag[] };

export type SyntheticTableUpdate =
    { player_order_end: PlayerOrderUpdate } |
    { player_animation_end: PlayerId } |
    { move_card_end: MoveCardUpdate } |
    { deck_shuffled_end: DeckShuffledUpdate } |
    { card_animation_end: CardId } |
    { move_cubes_end: MoveCubesUpdate } |
    { move_train_end: MoveTrainUpdate };

export type TableUpdate = GameTableUpdate | SyntheticTableUpdate;

export type GameStateUpdate = 
    { game_error: GameString } |
    { game_log: GameString } |
    { game_prompt: GameString } |
    { play_sound: string } |
    { request_status: RequestStatusArgs } | 
    { status_ready: StatusReadyArgs } |
    { status_clear: Empty } |
    { clear_logs: Empty };

export type GameUpdate = GameTableUpdate | GameStateUpdate;