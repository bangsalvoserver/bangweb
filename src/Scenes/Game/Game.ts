import { Dispatch } from "react";
import { AddCubesUpdate, DeckShuffledUpdate, FlashCardUpdate, GameString, HideCardUpdate, MoveCardUpdate, MoveCubesUpdate, MoveScenarioDeckUpdate, MoveTrainUpdate, PlayerAddUpdate, PlayerGoldUpdate, PlayerHpUpdate, PlayerOrderUpdate, PlayerShowRoleUpdate, PlayerStatusUpdate, RequestStatusArgs, ShortPauseUpdate, ShowCardUpdate, StatusReadyArgs, TapCardUpdate } from "../../Messages/GameUpdate";
import { GameUpdate } from "./GameTable";
import { AnimationBase, GameAnimation } from "./GameAnimation";

export class Game {

    private queuedUpdates: any[] = [];
    private animations: GameAnimation[] = [];

    private tableDispatch: Dispatch<GameUpdate>;

    private gameUpdateHandlers = new Map<string, (update: any) => void>([
        ['game_error', this.handleGameError],
        ['game_log', this.handleGameLog],
        ['game_prompt', this.handleGamePrompt],
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

    constructor(tableDispatch: Dispatch<any>) {
        this.tableDispatch = tableDispatch;
    }

    pushUpdate(update: any) {
        this.queuedUpdates.push(update);
    }

    tick(timeElapsed: number) {
        let tickTime = timeElapsed;
        while (true) {
            if (this.animations.length == 0) {
                if (this.queuedUpdates.length != 0) {
                    const update = this.queuedUpdates.shift();
                    const updateType = Object.keys(update)[0];
                    const updateValue = update[updateType];

                    let handler = this.gameUpdateHandlers.get(updateType);
                    if (handler) {
                        handler.call(this, updateValue);
                    } else {
                        this.tableDispatch({ updateType, updateValue });
                    }
                } else {
                    break;
                }
            } else {
                const anim = this.animations[0];
                anim.tick(tickTime);
                if (anim.done()) {
                    tickTime = anim.extraTime();

                    anim.end();
                    this.animations.shift();
                } else {
                    break;
                }
            }
        }
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

    private handleMoveCard({ card, player, pocket, duration }: MoveCardUpdate) {
        this.animations.push(new AnimationBase(duration));
    }

    private handleAddCubes({ num_cubes, target_card }: AddCubesUpdate) {
        // TODO
    }

    private handleMoveCubes({ num_cubes, origin_card, target_card, duration }: MoveCubesUpdate) {
        this.animations.push(new AnimationBase(duration));
    }

    private handleMoveScenarioDeck({ player, pocket, duration }: MoveScenarioDeckUpdate) {
        this.animations.push(new AnimationBase(duration));
    }

    private handleMoveTrain({ position, duration }: MoveTrainUpdate) {
        this.animations.push(new AnimationBase(duration));
    }

    private handleDeckShuffled({ pocket, duration }: DeckShuffledUpdate) {
        this.animations.push(new AnimationBase(duration));
    }

    private handleShowCard({ card, info, duration }: ShowCardUpdate) {
        this.animations.push(new AnimationBase(duration));
    }

    private handleHideCard({ card, duration }: HideCardUpdate) {
        this.animations.push(new AnimationBase(duration));
    }

    private handleTapCard({ card, inactive, duration }: TapCardUpdate) {
        this.animations.push(new AnimationBase(duration));
    }

    private handleFlashCard({ card, duration }: FlashCardUpdate) {
        this.animations.push(new AnimationBase(duration));
    }

    private handleShortPause({ card, duration }: ShortPauseUpdate) {
        this.animations.push(new AnimationBase(duration));
    }

    private handlePlayerAdd({ players }: PlayerAddUpdate) {
        // TODO
    }

    private handlePlayerOrder({ players, duration }: PlayerOrderUpdate) {
        this.animations.push(new AnimationBase(duration));
    }

    private handlePlayerHp({ player, hp, duration }: PlayerHpUpdate) {
        this.animations.push(new AnimationBase(duration));
    }

    private handlePlayerGold({ player, gold }: PlayerGoldUpdate) {
        // TODO
    }

    private handlePlayerShowRole({ player, role, duration }: PlayerShowRoleUpdate) {
        this.animations.push(new AnimationBase(duration));
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

    private handleGameFlags(flags: string[]) {
        // TODO
    }

    private handlePlaySound(sound: string) {
        // TODO
    }

    private handleStatusClear() {
        // TODO
    }
}