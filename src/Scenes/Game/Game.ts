import { AddCardsUpdate, AddCubesUpdate, DeckShuffledUpdate, FlashCardUpdate, GameString, HideCardUpdate, MoveCardUpdate, MoveCubesUpdate, MoveScenarioDeckUpdate, MoveTrainUpdate, PlayerAddUpdate, PlayerGoldUpdate, PlayerHpUpdate, PlayerOrderUpdate, PlayerShowRoleUpdate, PlayerStatusUpdate, RemoveCardsUpdate, RequestStatusArgs, ShortPauseUpdate, ShowCardUpdate, StatusReadyArgs, TapCardUpdate } from "../../Messages/GameUpdate";

export class Game {

    private myUserId: number;

    constructor (myUserId: number) {
        this.myUserId = myUserId;
    }

    handleGameError(message: GameString) {
        // TODO
    }

    handleGameLog(message: GameString) {
        // TODO
    }

    handleGamePrompt(message: GameString) {
        // TODO
    }

    handleAddCards({ card_ids, pocket_type, player }: AddCardsUpdate) {
        // TODO
    }

    handleRemoveCards({ cards }: RemoveCardsUpdate) {
        // TODO
    }

    handleMoveCard({ card, player, pocket, duration }: MoveCardUpdate) {
        // TODO
    }

    handleAddCubes({ num_cubes, target_card }: AddCubesUpdate) {
        // TODO
    }

    handleMoveCubes({ num_cubes, origin_card, target_card, duration }: MoveCubesUpdate) {
        // TODO
    }

    handleMoveScenarioDeck({ player, pocket, duration }: MoveScenarioDeckUpdate) {
        // TODO
    }

    handleMoveTrain({ position, duration }: MoveTrainUpdate) {
        // TODO
    }

    handleDeckShuffled({ pocket, duration }: DeckShuffledUpdate) {
        // TODO
    }

    handleShowCard({ card, info, duration }: ShowCardUpdate) {
        // TODO
    }

    handleHideCard({ card, duration }: HideCardUpdate) {
        // TODO
    }

    handleTapCard({ card, inactive, duration }: TapCardUpdate) {
        // TODO
    }

    handleFlashCard({ card, duration }: FlashCardUpdate) {
        // TODO
    }

    handleShortPause({ card, duration }: ShortPauseUpdate) {
        // TODO
    }

    handlePlayerAdd({ players }: PlayerAddUpdate) {
        // TODO
    }

    handlePlayerOrder({ players, duration }: PlayerOrderUpdate) {
        // TODO
    }
    
    handlePlayerHp({ player, hp, duration }: PlayerHpUpdate) {
        // TODO
    }

    handlePlayerGold({ player, gold }: PlayerGoldUpdate) {
        // TODO
    }

    handlePlayerShowRole({ player, role, duration }: PlayerShowRoleUpdate) {
        // TODO
    }

    handlePlayerStatus({ player, flags, range_mod, weapon_range, distance_mod }: PlayerStatusUpdate) {
        // TODO
    }
    
    handleSwitchTurn(player: number) {
        // TODO
    }
    
    handleRequestStatus({ origin_card, origin, target, status_text, auto_select, respond_cards, pick_cards, highlight_cards }: RequestStatusArgs) {
        // TODO
    }
    
    handleStatusReady({ play_cards }: StatusReadyArgs) {
        // TODO
    }
    
    handleGameFlags(flags: string) {
        // TODO
    }
    
    handlePlaySound(sound: string) {
        // TODO
    }
    
    handleStatusClear() {
        // TODO
    }
}