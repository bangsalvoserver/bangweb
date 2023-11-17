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
        game_seed:              "Seed di Gioco",
    },

    ExpansionType: {
        thebullet:              "Dynamite Box",
        dodgecity:              "Dodge City",
        valleyofshadows:        "Valley Of Shadows",
        greattrainrobbery:      "The Great Train Robbery",
        wildwestshow:           "Wild West Show",
        goldrush:               "Gold Rush",
        armedanddangerous:      "Armed & Dangerous",
        highnoon:               "High Noon",
        fistfulofcards:         "A Fistful of Cards",
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

    lobby: {
        USER_JOINED_LOBBY: (username) => `${username} entra in lobby`,
        USER_LEFT_LOBBY: (username) => `${username} esce dalla lobby`,
        CONNECTION_ERROR: "Errore di connessione",
        ERROR_INVALID_LOBBY: "ID lobby non valido",
        ERROR_PLAYER_IN_LOBBY: "Giocatore già in una lobby",
        ERROR_PLAYER_NOT_IN_LOBBY: "Giocatore non in una lobby",
        ERROR_PLAYER_NOT_LOBBY_OWNER: "Non proprietario della lobby",
        ERROR_USER_NOT_CONTROLLING_PLAYER: "Giocatore non in gioco",
        ERROR_NOT_ENOUGH_PLAYERS: "Non ci sono abbastanza giocatori",
        ERROR_TOO_MANY_PLAYERS: "Ci sono troppi giocatori",
        ERROR_LOBBY_NOT_WAITING: "Lobby non in attesa",
        ERROR_LOBBY_NOT_PLAYING: "Lobby non in gioco",
        ERROR_LOBBY_NOT_FINISHED: "Lobby non in partita finita",
        ERROR_GAME_CHEATS_NOT_ENABLED: "I trucchi non sono abilitati",
        INVALID_COMMAND_NAME: "Comando non valido",
    },

};