import { Milliseconds, UserId } from "../../../Model/ServerMessage";
import { Container, ContainerKey, parseContainer } from "../../../Utils/ArrayUtils";
import { Empty } from "../../../Utils/UnionUtils";
import { CardDataArgs, CardSign } from "./CardData";
import { DeckType, ExpansionType, GameFlag, PlayerFlag, PlayerRole, PocketType, SoundId, TokenType } from "./CardEnums";

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

export interface PreloadAssets {
    images: string[];
    sounds: string[];
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

export type PocketPosition = 'begin' | 'end' | 'random';

export interface MoveCardUpdate {
    card: CardId;
    player: PlayerId | null;
    pocket: PocketType;
    position: PocketPosition;
}

export type TokenPosition = { table: Empty } | { card: CardId } | { player: PlayerId };

export interface AddTokensUpdate {
    token_type: TokenType;
    num_tokens: number;
    target: TokenPosition;
}

export interface MoveTokensUpdate {
    token_type: TokenType;
    num_tokens: number;
    origin: TokenPosition;
    target: TokenPosition;
}

export interface MoveTrainUpdate {
    position: number;
}

export type ShufflePocket = 'main_deck' | 'shop_deck' | 'train_deck' | 'feats_deck';

export interface DeckShuffledUpdate {
    pocket: ShufflePocket;
}

export interface ShowCardUpdate {
    card: CardId;
    info: CardDataArgs;
}

export interface HideCardUpdate {
    card: CardId;
}

export interface TapCardUpdate {
    card: CardId;
    inactive: boolean;
}

export interface FlashCardUpdate {
    cards: CardId[];
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

interface RequestStatusBase<K extends ContainerKey> {
    origin_card: CardId | null;
    origin: PlayerId | null;
    target: PlayerId | null;
    status_text: GameString;
    respond_cards: PlayableCardInfo[];
    highlight_cards: Container<K, CardId>;
    distances: PlayerDistances;
    target_set_players: Container<K, PlayerId>;
    target_set_cards: Container<K, CardId>;
    timer: TimerStatusArgs | null;
}

export type RequestStatus = RequestStatusBase<'set'>;
export type RequestStatusArgs = RequestStatusBase<'array'>;

export function parseRequestStatus(request: RequestStatusArgs): RequestStatus {
    return {
        ...request,
        highlight_cards: parseContainer(request.highlight_cards),
        target_set_players: parseContainer(request.target_set_players),
        target_set_cards: parseContainer(request.target_set_cards)
    }
}

export interface StatusReady {
    play_cards: PlayableCardInfo[];
    distances: PlayerDistances;
}

export type StatusReadyArgs = StatusReady;

export function parseStatusReady(request: StatusReadyArgs): StatusReady {
    return request;
}

export type GameOptions = Partial<{
    expansions: ExpansionType[];
    character_choice: number;
    max_players: number;
    add_bots: boolean;
    allow_beer_in_duel: boolean;
    quick_discard_all: boolean;
    auto_pick_predraw: boolean;
    allow_bot_rejoin: boolean;
    only_base_characters: boolean;
    scenario_deck_size: number;
    auto_resolve_timer: Milliseconds;
    damage_timer: Milliseconds;
    escape_timer: Milliseconds;
    bot_play_timer: Milliseconds;
    game_seed: number;
}>;

export type GameTableUpdate = 
    { add_cards: AddCardsUpdate } |
    { remove_cards: RemoveCardsUpdate } |
    { player_add: PlayerAddUpdate } |
    { player_order: PlayerOrderUpdate & Duration } |
    { player_hp: PlayerHpUpdate & Duration } |
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
    { add_tokens: AddTokensUpdate } |
    { move_tokens: MoveTokensUpdate & Duration } |
    { move_train: MoveTrainUpdate & Duration } |
    { game_flags: GameFlag[] };

export type SyntheticTableUpdate =
    { player_order_end: PlayerOrderUpdate } |
    { player_animation_end: PlayerId } |
    { move_card_end: MoveCardUpdate } |
    { deck_shuffled_end: DeckShuffledUpdate } |
    { card_animation_end: CardId } |
    { cards_animation_end: CardId[] } |
    { move_tokens_end: MoveTokensUpdate } |
    { move_train_end: MoveTrainUpdate };

export type TableUpdate = GameTableUpdate | SyntheticTableUpdate;

export type GameStateUpdate = 
    { preload_assets: PreloadAssets } |
    { game_error: GameString } |
    { game_log: GameString } |
    { game_prompt: GameString } |
    { play_sound: SoundId } |
    { request_status: RequestStatusArgs } | 
    { status_ready: StatusReadyArgs } |
    { status_clear: Empty } |
    { clear_logs: Empty };

export type GameUpdate = GameTableUpdate | GameStateUpdate;