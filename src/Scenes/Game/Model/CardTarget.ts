import { Container, ContainerKey } from "../../../Utils/ArrayUtils";
import { CardFilter, CardSuit, EffectType, PlayerFilter } from "./CardEnums";
import { Card, Player } from "./GameTable";
import { CardId, PlayerId } from "./GameUpdate";

interface PlayerTargetArgsBase<K extends ContainerKey> {
    player_filter: Container<K, PlayerFilter>;
}

type PlayerTargetMapping<T = unknown> = {
    [K in ContainerKey]: PlayerTargetArgsBase<K> & T;
};

export type PlayerTargetArgsArray = PlayerTargetArgsBase<'array'>;
export type PlayerTargetArgs = PlayerTargetArgsBase<'set'>;

interface CardTargetArgsBase<K extends ContainerKey> {
    player_filter: Container<K, PlayerFilter>;
    card_filter: Container<K, CardFilter>;
}

type CardTargetMapping<T = unknown> = {
    [K in ContainerKey]: CardTargetArgsBase<K> & T;
};

export type CardTargetArgsArray = CardTargetArgsBase<'array'>;
export type CardTargetArgs = CardTargetArgsBase<'set'>;

export type CardTargetTypes = {
    none: {
        value: null,
        target: null
    },
    player: {
        value: Player,
        target: PlayerId,
        effect: PlayerTargetMapping
    },
    conditional_player: {
        value: Player | null,
        target: PlayerId | null,
        effect: PlayerTargetMapping
    },
    adjacent_players: {
        value: {players: Player[], finished: boolean},
        target: PlayerId[],
        effect: PlayerTargetMapping<{ max_distance: number }>
    },
    player_per_cube: {
        value: { cubes: Card[], max_cubes: number, players: Player[] },
        target: [CardId[], PlayerId[]],
        effect: PlayerTargetMapping<{ extra_players: number }>
    },
    card: {
        value: Card,
        target: CardId,
        effect: CardTargetMapping
    },
    random_if_hand_card: {
        value: Card,
        target: CardId,
        effect: CardTargetMapping
    },
    extra_card: {
        value: Card | null,
        target: CardId | null,
        effect: CardTargetMapping
    },
    players: {
        value: Player[],
        target: null,
        effect: PlayerTargetMapping
    },
    cards: {
        value: Card[],
        target: CardId[],
        effect: CardTargetMapping<{ ncards: number }>
    },
    max_cards: {
        value: { cards: Card[], max_cards: number },
        target: CardId[],
        effect: CardTargetMapping<{ ncards: number }>
    },
    bang_or_cards: {
        value: { cards: Card[], state: 'bang' | 'cards' | 'finished' },
        target: CardId[],
        effect: CardTargetMapping<{ ncards: number }>
    },
    card_per_player: {
        value: { cards: Card[], max_cards: number },
        target: CardId[],
        effect: CardTargetMapping
    },
    missed_and_same_suit: {
        value: { cards: Card[], targets_by_suit: Partial<Record<CardSuit, Card[]>> },
        target: CardId[],
        effect: CardTargetMapping<{ ncards: number }>
    },
    cube_slot: {
        value: Card,
        target: CardId,
        effect: PlayerTargetMapping<{ stealing: boolean }>
    },
    move_cube_slot: {
        value: { cards: Card[], max_cubes: number },
        target: CardId[],
        effect: { max_cubes: number }
    },
    select_cubes: {
        value: Card[],
        target: CardId[],
        effect: { ncubes: number }
    },
    select_cubes_optional: {
        value: { cubes: Card[], max_cubes: number },
        target: CardId[],
        effect: { ncubes: number }
    },
    select_cubes_player: {
        value: { cubes: Card[], max_cubes: number, player: Player | null },
        target: [CardId[], PlayerId],
        effect: PlayerTargetMapping<{ ncubes: number }>
    },
    select_cubes_repeat: {
        value: { cubes: Card[], max_cubes: number },
        target: CardId[],
        effect: { ncubes: number }
    },
    self_cubes: {
        value: { num_cubes: number },
        target: null,
        effect: { ncubes: number }
    }
};

export type TargetType = keyof CardTargetTypes;

export type CardTarget = { [ K in TargetType ] : { type: K, value: CardTargetTypes[K]['value'] } }[TargetType];
export type CardTargetGenerated = CardTargetTypes[TargetType]['target'];

export type CardEffectOf<Target extends TargetType, K extends ContainerKey> = {
    type: EffectType;
    target: Target;
} & (CardTargetTypes[Target] extends { effect: infer Effect }
    ? Effect extends { [P in K]: infer E } ? E : Effect
    : {});

export type CardEffectBase<K extends ContainerKey> = { [Target in TargetType]: CardEffectOf<Target, K> }[TargetType]

export type CardEffectArgs = CardEffectBase<'array'>;
export type CardEffect = CardEffectBase<'set'>;