import { GameManager } from "../../Messages/GameManager";

export class TargetSelector {
    private gameManager: GameManager;

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager;
    }
}