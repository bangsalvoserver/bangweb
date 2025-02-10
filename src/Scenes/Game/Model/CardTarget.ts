import { Distribute, Empty } from "../../../Utils/UnionUtils";
import { Card, Player } from "./GameTable";
import { CardId, PlayerId } from "./GameUpdate";

export type CardTargetTypes = {
    none: [
        Empty,
        Empty
    ],
    player: [
        Player,
        PlayerId
    ],
    conditional_player: [
        Player | null,
        PlayerId | null
    ],
    adjacent_players: [
        Player[],
        PlayerId[]
    ],
    player_per_cube: [
        { cubes: Card[], max_cubes: number, players: Player[] },
        [CardId[], PlayerId[]]
    ],
    card: [
        Card,
        CardId
    ],
    random_if_hand_card: [
        Card,
        CardId
    ],
    extra_card: [
        Card | null,
        CardId | null
    ],
    players: [
        Player[],
        Empty
    ],
    cards: [
        Card[],
        CardId[]
    ],
    max_cards: [
        { cards: Card[], max_cards: number },
        CardId[]
    ],
    card_per_player: [
        { cards: Card[], max_cards: number },
        CardId[]
    ],
    cube_slot: [
        Card,
        CardId
    ],
    move_cube_slot: [
        { cards: Card[], max_cubes: number },
        CardId[]
    ],
    select_cubes: [
        Card[],
        CardId[]
    ],
    select_cubes_optional: [
        { cubes: Card[], max_cubes: number },
        CardId[]
    ],
    select_cubes_repeat: [
        { cubes: Card[], max_cubes: number },
        CardId[]
    ],
    self_cubes: [
        { num_cubes: number },
        Empty
    ]
};

export type TargetType = keyof CardTargetTypes;

export type CardTarget =            Distribute<{ [ K in TargetType ] : CardTargetTypes[K] extends [infer T, unknown] ? T : never }>;
export type CardTargetGenerated =   Distribute<{ [ K in TargetType ] : CardTargetTypes[K] extends [unknown, infer T] ? T : never }>;