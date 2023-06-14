import { LabelRegistry } from "../Registry";

export const LABELS_ITALIAN: LabelRegistry = {

    LobbyState: {
        waiting:                "In attesa",
        playing:                "In gioco",
        finished:               "Partita finita"
    },

    GameOptions: {
        expansions:             "Espansioni",
        character_choice:       "Scelta Dei Personaggi",
        enable_ghost_cards:     "Abilita Carte Fantasma",
        allow_beer_in_duel:     "Permetti Birra in duello",
        quick_discard_all:      "Scarta Tutto Veloce",
        scenario_deck_size:     "Carte Scenario",
        num_bots:               "Numero di Bot",
        damage_timer:           "Timer di Danno (ms)",
        escape_timer:           "Timer di Fuga (ms)",
        bot_play_timer:         "Timer di Giocata Bot (ms)",
        tumbleweed_timer:       "Timer di Cespuglio (ms)",
    },

    ExpansionType: {
        thebullet:              "La Pallottola",
        dodgecity:              "Dodge City",
        valleyofshadows:        "La Valle Delle Ombre",
        greattrainrobbery:      "The Great Train Robbery",
        wildwestshow:           "Wild West Show",
        goldrush:               "Corsa all'Oro",
        armedanddangerous:      "Armed And Dangerous",
        highnoon:               "Mezzogiorno di Fuoco",
        fistfulofcards:         "Per un Pugno di Carte",
        canyondiablo:           "Canyon Diablo",
    },

    ui: {
        UNKNOWN_CARD: "(Carta sconosciuta)",
        UNKNOWN_PLAYER: "(Giocatore sconosciuto)",
        USER_DISCONNECTED: "(Disconnesso)",
        LOBBY_CHAT_SEND: "Invia",
        GAME_OVER_STATUS: "Partita Finita",
        RETURN_LOBBY: "Ritorna alla Lobby",
        BUTTON_OK: "OK",
        BUTTON_UNDO: "Annulla",
        BUTTON_YES: "Sì",
        BUTTON_NO: "No",
        BUTTON_PLAY: "Gioca",
        BUTTON_PICK: "Scarta",
    },

};