import { AddCardsUpdate, AddCubesUpdate, DeckShuffledUpdate, FlashCardUpdate, GameString, HideCardUpdate, MoveCardUpdate, MoveCubesUpdate, MoveScenarioDeckUpdate, MoveTrainUpdate, PlayerAddUpdate, PlayerGoldUpdate, PlayerHpUpdate, PlayerOrderUpdate, PlayerShowRoleUpdate, PlayerStatusUpdate, RemoveCardsUpdate, RequestStatusArgs, ShortPauseUpdate, ShowCardUpdate, StatusReadyArgs, TapCardUpdate } from "../../Messages/GameUpdate";

export class Game {

    private myUserId: number;
    private queuedUpdates: any[] = [];

    private gameUpdateHandlers = new Map<string, (update: any) => void>([
        ['game_error', this.handleGameError],
        ['game_log', this.handleGameLog],
        ['game_prompt', this.handleGamePrompt],
        ['add_cards', this.handleAddCards],
        ['remove_cards', this.handleRemoveCards],
        ['move_card', this.handleMoveCard],
        ['add_cubes', this.handleAddCubes],
        ['move_cubes', this.handleMoveCubes],
        ['move_scenario_deck', this.handleMoveScenarioDeck],
        ['move_train', this.handleMoveTrain],
        ['deck_shuffled', this.handleDeckShuffled],
        ['show_card', this.handleShowCard],
        ['hide_card', this.handleHideCard],
        ['tap_card', this.handleTapCard],
        ['flash_card', this.handleFlashCard],
        ['short_pause', this.handleShortPause],
        ['player_add', this.handlePlayerAdd],
        ['player_order', this.handlePlayerOrder],
        ['player_hp', this.handlePlayerHp],
        ['player_gold', this.handlePlayerGold],
        ['player_show_role', this.handlePlayerShowRole],
        ['player_status', this.handlePlayerStatus],
        ['switch_turn', this.handleSwitchTurn],
        ['request_status', this.handleRequestStatus],
        ['status_ready', this.handleStatusReady],
        ['game_flags', this.handleGameFlags],
        ['play_sound', this.handlePlaySound],
        ['status_clear', this.handleStatusClear],
    ]);

    constructor(myUserId: number) {
        this.myUserId = myUserId;
    }

    queueUpdate(update: any) {
        this.queuedUpdates.push(update);
    }

    tick() {
        if (this.queuedUpdates.length == 0) return;
        const update = this.queuedUpdates.shift();
        console.log(JSON.stringify(update));
        
        const updateType = Object.keys(update)[0];
        const handler = this.gameUpdateHandlers.get(updateType);
        if (handler) handler(update[updateType]);
    }

    private handleGameError(message: GameString) {
        // TODO
    }

    private handleGameLog(message: GameString) {
        // TODO
    }

    private handleGamePrompt(message: GameString) {
        // TODO
    }

    private handleAddCards({ card_ids, pocket_type, player }: AddCardsUpdate) {
        // TODO
    }

    private handleRemoveCards({ cards }: RemoveCardsUpdate) {
        // TODO
    }

    private handleMoveCard({ card, player, pocket, duration }: MoveCardUpdate) {
        // TODO
    }

    private handleAddCubes({ num_cubes, target_card }: AddCubesUpdate) {
        // TODO
    }

    private handleMoveCubes({ num_cubes, origin_card, target_card, duration }: MoveCubesUpdate) {
        // TODO
    }

    private handleMoveScenarioDeck({ player, pocket, duration }: MoveScenarioDeckUpdate) {
        // TODO
    }

    private handleMoveTrain({ position, duration }: MoveTrainUpdate) {
        // TODO
    }

    private handleDeckShuffled({ pocket, duration }: DeckShuffledUpdate) {
        // TODO
    }

    private handleShowCard({ card, info, duration }: ShowCardUpdate) {
        // TODO
    }

    private handleHideCard({ card, duration }: HideCardUpdate) {
        // TODO
    }

    private handleTapCard({ card, inactive, duration }: TapCardUpdate) {
        // TODO
    }

    private handleFlashCard({ card, duration }: FlashCardUpdate) {
        // TODO
    }

    private handleShortPause({ card, duration }: ShortPauseUpdate) {
        // TODO
    }

    private handlePlayerAdd({ players }: PlayerAddUpdate) {
        // TODO
    }

    private handlePlayerOrder({ players, duration }: PlayerOrderUpdate) {
        // TODO
    }

    private handlePlayerHp({ player, hp, duration }: PlayerHpUpdate) {
        // TODO
    }

    private handlePlayerGold({ player, gold }: PlayerGoldUpdate) {
        // TODO
    }

    private handlePlayerShowRole({ player, role, duration }: PlayerShowRoleUpdate) {
        // TODO
    }

    private handlePlayerStatus({ player, flags, range_mod, weapon_range, distance_mod }: PlayerStatusUpdate) {
        // TODO
    }

    private handleSwitchTurn(player: number) {
        // TODO
    }

    private handleRequestStatus({ origin_card, origin, target, status_text, auto_select, respond_cards, pick_cards, highlight_cards }: RequestStatusArgs) {
        // TODO
    }

    private handleStatusReady({ play_cards }: StatusReadyArgs) {
        // TODO
    }

    private handleGameFlags(flags: string) {
        // TODO
    }

    private handlePlaySound(sound: string) {
        // TODO
    }

    private handleStatusClear() {
        // TODO
    }
}