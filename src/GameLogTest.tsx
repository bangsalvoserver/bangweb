import { useEffect, useMemo, useState } from "react";
import { newLobbyState } from "./Model/SceneState";
import { UserId } from "./Model/ServerMessage";
import { GameStateContext } from "./Scenes/Game/GameScene";
import GameStringComponent from "./Scenes/Game/GameStringComponent";
import { newPlayer } from "./Scenes/Game/Model/GameTable";
import { GameString, PlayerId } from "./Scenes/Game/Model/GameUpdate";
import { newGameState } from "./Scenes/Game/Model/UseGameState";
import { LobbyContext } from "./Scenes/Lobby/Lobby";

type GameLogUpdate = {
    game_update: {
        game_log: GameString
    }
};

function useFetch(filename: string | undefined) {
    const [contents, setContents] = useState<string>();
    useEffect(() => {
        if (filename) {
            (async () => {
                const response = await fetch(filename);
                setContents(await response.text());
            })();
        }
    }, [filename]);
    return contents;
}

const LOGS_FILENAMES: Record<string, string> = {
    '1': '/game_logs_1.log',
    '2': '/game_logs_2.log'
};

const LOG_FILENAME = LOGS_FILENAMES[window.location.search.substring(1)];

const PLAYER_IDS: { player_id: PlayerId, user_id: UserId, name: string }[] = [
    { player_id: 1, user_id: -6, name: "Player 1" },
    { player_id: 2, user_id: 5, name: "Tizio" },
    { player_id: 3, user_id: -1, name: "Player 3" },
    { player_id: 4, user_id: 3, name: "Caio" },
    { player_id: 5, user_id: -2, name: "Player 5" },
    { player_id: 6, user_id: -5, name: "Player 6" },
    { player_id: 7, user_id: -3, name: "Player 7" },
    { player_id: 8, user_id: -4, name: "Player 8" }
]

export default function GameLogTest() {
    const logsContents = useFetch(LOG_FILENAME);

    const logs = useMemo(() => logsContents ? logsContents.split('\n').map(line => {
        const update = JSON.parse(line) as GameLogUpdate;
        return update.game_update.game_log;
    }) : [], [logsContents]);

    const state = useMemo(() => {
        let value = newGameState(0);
        value.table.players = PLAYER_IDS.map(({player_id, user_id}) => newPlayer(player_id, user_id));
        return value;
    }, []);

    const lobbyState = useMemo(() => {
        let value = newLobbyState(0, 0);
        value.users = PLAYER_IDS.map(({user_id: id, name}) => ({
            id, name, lifetime: 0
        }));
        return value;
    }, []);

    return <GameStateContext.Provider value={state}>
        <LobbyContext.Provider value={lobbyState}>
            {logs.map((message, index) => (
                <p key={index}><GameStringComponent message={message} /></p>
            ))}
        </LobbyContext.Provider>
    </GameStateContext.Provider>
}