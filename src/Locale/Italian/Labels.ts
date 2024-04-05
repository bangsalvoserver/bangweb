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
        quick_discard_all:      "Scarta Tutto Veloce",
        scenario_deck_size:     "Carte Scenario",
        num_bots:               "Numero di Bot",
        damage_timer:           "Timer Danno",
        escape_timer:           "Timer Fuga",
        bot_play_timer:         "Timer Giocata Bot",
        tumbleweed_timer:       "Timer Cespuglio",
        game_seed:              "Seed di Gioco",
    },

    GameOptionsTooltip: {
        character_choice:       "Abilita la scelta su due personaggi prima dell'inizio della partita.",
        enable_ghost_cards:     "Abilita le carte che possono riportare in gioco i giocatori eliminati.",
        quick_discard_all:      "Risolvi automaticamente azioni dove il giocatore deve scartare tutte le carte.",
        scenario_deck_size:     "I mazzi di High Noon e Fistful of Cards vengono mischiati assieme in un mazzetto di questa dimensione.",
        num_bots:               "Numero di bot per questa partita.",
        damage_timer:           "Timer (in ms) per permettere di giocare carte come Salvo!, quando qualcuno prende danno.",
        escape_timer:           "Timer (in ms) per permettere di giocare Funga, prima che l'azione si risolva automaticamente.",
        bot_play_timer:         "Timer (in ms) per controllare la velocità di gioco dei bot.",
        tumbleweed_timer:       "Timer (in ms) per permettere di giocare Cespuglio, prima che l'estrazione si risolva automaticamente. (Imposta a 0 per disattivare)",
        game_seed:              "Seme per il generatore di numeri casuali. (Imposta a 0 per usare un valore casuale)"
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

    PlayerRole: {
        unknwown:               "(Ruolo sconosciuto)",
        sheriff:                "Sceriffo",
        deputy:                 "Vice",
        outlaw:                 "Fuorilegge",
        renegade:               "Rinnegato",
        deputy_3p:              "Vice",
        outlaw_3p:              "Fuorilegge",
        renegade_3p:            "Rinnegato"
    },

    ui: {
        APP_TITLE: "Bang!",
        LOADING: "Caricamento...",
        UNKNOWN_CARD: "(Carta sconosciuta)",
        UNKNOWN_PLAYER: "(Giocatore sconosciuto)",
        USER_DISCONNECTED: "(Disconnesso)",
        STATUS_GAME_OVER: "Partita Finita",
        LABEL_USERNAME: "Nome Utente:",
        LABEL_LOBBY_NAME: "Nome Lobby:",
        GAME_OPTIONS: "Opzioni di Partita",
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
        BUTTON_REJOIN: "Rientra",
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