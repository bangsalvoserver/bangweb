import { PocketPosition, PocketPositionMap } from "../Pockets/PocketView";
import { PlayerId } from "../Model/GameUpdate";
import { Card, PocketRef, ScenarioHolders } from "../Model/GameTable";
import { Rect, getDivRect } from "../../../Utils/Rect";
import { PocketType } from "../Model/CardEnums";
import { MapRef } from "../../../Utils/LazyRef";

export interface CardTracker {
    getPlayerPockets: (player: PlayerId) => PocketPositionMap | undefined;
    getTablePocket: (pocket: PocketRef) => PocketPosition | undefined;
    getCubesRect: (card: Card | undefined) => Rect | undefined;
}
export class CardTrackerImpl implements CardTracker {
    private scenarioHolders: ScenarioHolders;
    private pocketPositions: MapRef<PocketType, PocketPosition>;
    private playerPositions: MapRef<PlayerId, PocketPositionMap>;
    private cubesRef: HTMLDivElement | null;

    constructor(
        scenarioHolders: ScenarioHolders,
        pocketPositions: MapRef<PocketType, PocketPosition>,
        playerPositions: MapRef<PlayerId, PocketPositionMap>,
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
                    return this.getPlayerPockets(holder)?.get(pocket.name);
                }
            } else if ('player' in pocket) {
                return this.getPlayerPockets(pocket.player)?.get(pocket.name);
            } else {
                return this.pocketPositions.get(pocket.name);
            }
        }
        return undefined;
    }

    getCubesRect(card: Card | undefined) {
        if (card) {
            return this.getTablePocket(card.pocket)?.getCardRect(card.id);
        } else {
            return this.cubesRef ? getDivRect(this.cubesRef) : undefined;
        }
    }
}