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
        damage_timer:           "Timer Danno",
        escape_timer:           "Timer Fuga",
        bot_play_timer:         "Timer Giocata Bot",
        tumbleweed_timer:       "Timer Cespuglio",
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
        APP_TITLE: "Bang!",
        UNKNOWN_CARD: "(Carta sconosciuta)",
        UNKNOWN_PLAYER: "(Giocatore sconosciuto)",
        USER_DISCONNECTED: "(Disconnesso)",
        STATUS_GAME_OVER: "Partita Finita",
        LABEL_USERNAME: "Nome Utente:",
        LABEL_LOBBY_NAME: "Nome Lobby:",
        BUTTON_CHAT_SEND: "Invia",
        BUTTON_START_GAME: "Avvia Partita",
        BUTTON_RETURN_LOBBY: "Ritorna alla Lobby",
        BUTTON_OK: "OK",
        BUTTON_UNDO: "Annulla",
        BUTTON_YES: "Sì",
        BUTTON_NO: "No",
        BUTTON_PLAY: "Gioca",
        BUTTON_PICK: "Scarta",
        BUTTON_CONNECT: "Connetti",
        BUTTON_JOIN: "Entra",
        BUTTON_CREATE_LOBBY: "Crea Lobby",
        BUTTON_LEAVE_LOBBY: "Esci dalla Lobby",
        BUTTON_DISCONNECT: "Disconnetti",
    },

    notify: {
        USER_JOINED_LOBBY: (username) => `${username} entra in lobby`,
        USER_LEFT_LOBBY: (username) => `${username} esce dalla lobby`
    },

};