import { MapRef } from "../../../Utils/LazyRef";
import { Rect, getDivRect } from "../../../Utils/Rect";
import { PocketType } from "./CardEnums";
import { Card, PocketRef, ScenarioHolders } from "./GameTable";
import { CardId, PlayerId } from "./GameUpdate";

export interface PocketPosition {
    getPocketRect: () => Rect | null;
    getCardRect: (card: CardId) => Rect | null;
    getCardDiv: (card: CardId) => HTMLDivElement | null;
}

export type PocketPositionMap = MapRef<PocketType, PocketPosition>;
export type PlayerPositionMap = MapRef<PlayerId, PocketPositionMap>;

export interface CardTracker {
    getPlayerPockets: (player: PlayerId) => PocketPositionMap | null;
    getTablePocket: (pocket: PocketRef) => PocketPosition | null;
    getCubesRect: (card: Card | null) => Rect | null;
}

export class CardTrackerImpl implements CardTracker {
    private scenarioHolders: ScenarioHolders;
    private pocketPositions: PocketPositionMap;
    private playerPositions: PlayerPositionMap;
    private cubesRef: HTMLDivElement | null;

    constructor(
        scenarioHolders: ScenarioHolders,
        pocketPositions: PocketPositionMap,
        playerPositions: PlayerPositionMap,
        cubesRef: HTMLDivElement | null
    ) {
        this.scenarioHolders = scenarioHolders;
        this.pocketPositions = pocketPositions;
        this.playerPositions = playerPositions;
        this.cubesRef = cubesRef;
    }

    getPlayerPockets(player: PlayerId) {
        return this.playerPositions.get(player);
    }

    getTablePocket(pocket: PocketRef) {
        if (pocket) {
            if (pocket.name == 'scenario_deck' || pocket.name == 'wws_scenario_deck') {
                const holder = this.scenarioHolders[pocket.name];
                if (holder) {
                    return this.getPlayerPockets(holder)?.get(pocket.name) ?? null;
                }
            } else if ('player' in pocket) {
                return this.getPlayerPockets(pocket.player)?.get(pocket.name) ?? null;
            } else {
                return this.pocketPositions.get(pocket.name);
            }
        }
        return null;
    }

    getCubesRect(card: Card | null) {
        if (card) {
            return this.getTablePocket(card.pocket)?.getCardRect(card.id) ?? null;
        } else {
            return this.cubesRef ? getDivRect(this.cubesRef) : null;
        }
    }
}