import { LabelRegistry } from "../Registry";

export const LABELS_ENGLISH: LabelRegistry = {

    LobbyState: {
        waiting:                "Waiting",
        playing:                "Playing",
        finished:               "Finished"
    },

    GameOptions: {
        expansions:             "Expansions",
        character_choice:       "Character Choice",
        enable_ghost_cards:     "Enable Ghost cards",
        quick_discard_all:      "Quick Discard All",
        scenario_deck_size:     "Scenario Cards",
        num_bots:               "Number of Bots",
        damage_timer:           "Damage Timer",
        escape_timer:           "Escape Timer",
        bot_play_timer:         "Bot Play Timer",
        tumbleweed_timer:       "Tumbleweed Timer",
        game_seed:              "Game Seed",
    },

    ExpansionType: {
        thebullet:              "Dynamite Box",
        dodgecity:              "Dodge City",
        valleyofshadows:        "Valley of Shadows",
        greattrainrobbery:      "The Great Train Robbery",
        wildwestshow:           "Wild West Show",
        goldrush:               "Gold Rush",
        armedanddangerous:      "Armed & Dangerous",
        highnoon:               "High Noon",
        fistfulofcards:         "A Fistful of Cards",
        canyondiablo:           "Canyon Diablo",
    },

    PlayerRole: {
        unknwown:               "(Unknown role)",
        sheriff:                "Sheriff",
        deputy:                 "Deputy",
        outlaw:                 "Outlaw",
        renegade:               "Renegade",
        deputy_3p:              "Deputy",
        outlaw_3p:              "Outlaw",
        renegade_3p:            "Renegade"
    },

    ui: {
        APP_TITLE: "Bang!",
        LOADING: "Loading...",
        UNKNOWN_CARD: "(Unknown card)",
        UNKNOWN_PLAYER: "(Unknown player)",
        USER_DISCONNECTED: "(Disconnected)",
        STATUS_GAME_OVER: "Game Over",
        LABEL_USERNAME: "User Name:",
        LABEL_LOBBY_NAME: "Lobby Name:",
        BUTTON_CHAT_SEND: "Send",
        BUTTON_START_GAME: "Start Game",
        BUTTON_RETURN_LOBBY: "Return to Lobby",
        BUTTON_OK: "OK",
        BUTTON_UNDO: "Undo",
        BUTTON_YES: "Yes",
        BUTTON_NO: "No",
        BUTTON_PLAY: "Play",
        BUTTON_PICK: "Discard",
        BUTTON_CONNECT: "Connect",
        BUTTON_JOIN: "Join",
        BUTTON_CREATE_LOBBY: "Create Lobby",
        BUTTON_LEAVE_LOBBY: "Leave Lobby",
        BUTTON_DISCONNECT: "Disconnect",
    },

    lobby: {
        USER_JOINED_LOBBY: (username) => `${username} joined the lobby`,
        USER_LEFT_LOBBY: (username) => `${username} left the lobby`,
        CONNECTION_ERROR: "Errore di connessione",
        ERROR_INVALID_LOBBY: "Invalid Lobby ID",
        ERROR_PLAYER_IN_LOBBY: "Player already in a lobby",
        ERROR_PLAYER_NOT_IN_LOBBY: "Player not in a lobby",
        ERROR_PLAYER_NOT_LOBBY_OWNER: "Not owner of lobby",
        ERROR_USER_NOT_CONTROLLING_PLAYER: "Player not in game",
        ERROR_NOT_ENOUGH_PLAYERS: "Not enough players",
        ERROR_TOO_MANY_PLAYERS: "Too many players",
        ERROR_LOBBY_NOT_WAITING: "Lobby not waiting",
        ERROR_LOBBY_NOT_PLAYING: "Lobby not playing",
        ERROR_LOBBY_NOT_FINISHED: "Lobby not finished" ,
        ERROR_GAME_CHEATS_NOT_ENABLED: "Cheats are not enabled",
        INVALID_COMMAND_NAME: "Invalid command name",
    },
};