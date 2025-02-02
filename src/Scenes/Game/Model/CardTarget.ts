import { Empty } from "../../../Model/ServerMessage";
import { KeysOfUnion } from "../../../Utils/UnionUtils";
import { PlayerId, CardId } from "./GameUpdate";

export type CardTarget =
    { none: Empty } |
    { player: PlayerId } |
    { conditional_player: PlayerId | null } |
    { adjacent_players: PlayerId[] } |
    { player_per_cube: [CardId[], PlayerId[]] } |
    { card: CardId } |
    { random_if_hand_card: CardId } |
    { extra_card: CardId | null } |
    { players: Empty } |
    { cards: CardId[] } |
    { max_cards: CardId[] } |
    { card_per_player: CardId[] } |
    { move_cube_slot: CardId[] } |
    { select_cubes: CardId[] } |
    { select_cubes_optional: CardId[] } |
    { select_cubes_repeat: CardId[] } |
    { self_cubes: Empty };
    
export type TargetType = KeysOfUnion<CardTarget>;