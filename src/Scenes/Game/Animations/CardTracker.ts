import { MapRef } from "../../../Utils/LazyRef";
import { Rect, getDivRect } from "../../../Utils/Rect";
import { PocketType } from "../Model/CardEnums";
import { Card, PocketRef, ScenarioHolders } from "../Model/GameTable";
import { PlayerId } from "../Model/GameUpdate";
import { PocketPosition } from "../Pockets/PocketView";

export type PocketPositionMap = MapRef<PocketType, PocketPosition>;
export type PlayerPositionMap = MapRef<PlayerId, PocketPositionMap>;

export interface CardTracker {
    getPlayerPockets: (player: PlayerId) => PocketPositionMap | null;
    getTablePocket: (pocket: PocketRef) => PocketPosition | null;
    getCubesRect: (card: Card | undefined) => Rect | undefined;
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

    getCubesRect(card: Card | undefined) {
        if (card) {
            return this.getTablePocket(card.pocket)?.getCardRect(card.id);
        } else {
            return this.cubesRef ? getDivRect(this.cubesRef) : undefined;
        }
    }
}