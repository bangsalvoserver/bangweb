import { GameManager } from "../../Messages/GameManager";
import { GameTable } from "./GameTable";

export class TargetSelector {
    private gameTable: GameTable;
    private gameManager: GameManager;

    constructor(gameTable: GameTable, gameManager: GameManager) {
        this.gameTable = gameTable;
        this.gameManager = gameManager;
    }
}