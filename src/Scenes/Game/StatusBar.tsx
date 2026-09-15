// English comments only
import { useContext, useEffect, useRef } from "react";
import Button, { ButtonColor } from "../../Components/Button";
import TimerWidget from "../../Components/TimerWidget";
import { getLabel, useLanguage } from "../../Locale/Registry";
import { checkMyUserFlag } from "../../Model/SceneState";
import { LobbyContext } from "../Lobby/Lobby";
import { GameStateContext } from "./GameScene";
import GameStringComponent, { LocalizedCardName } from "./GameStringComponent";
import { getTagValue } from "./Model/Filters";
<<<<<<< HEAD
import { Card, getCard, getTablePocket, isCardKnown } from "./Model/GameTable";
=======
import { getCard, getTablePocket, KnownCard, Player, GameTable } from "./Model/GameTable";
>>>>>>> 3205b86 (feat: google forms match stats tracker)
import { GameString } from "./Model/GameUpdate";
import { useSelectorConfirm } from "./Model/SelectorConfirm";
import { isCardCurrent, isResponse, selectorCanPlayCard } from "./Model/TargetSelector";

export interface StatusProps {
  gameError: GameString | undefined;
  handleClearGameError: () => void;
  handleReturnLobby: () => void;
}

<<<<<<< HEAD
function getCardButtonColor(card: Card): ButtonColor {
=======
// Player specific action counters
export interface PlayerStatsTracker {
  kills: number;
  jailCount: number;
  dynamiteHit: number;
  bangsPlayed: number;
  duelsCount: number;
  abilitiesUsed: number;
}

function getCardButtonColor(card: KnownCard): ButtonColor {
>>>>>>> 3205b86 (feat: google forms match stats tracker)
  switch (getTagValue(card, 'button_color')) {
  case 0:
  default:
    return 'green';
  case 1:
    return 'red';
  case 2:
    return 'blue';
  }
}

// Global match stats accumulator
const matchStats: Record<number, PlayerStatsTracker> = {};

export function getPlayerTracker(playerId: number): PlayerStatsTracker {
  if (!matchStats[playerId]) {
    matchStats[playerId] = {
      kills: 0,
      jailCount: 0,
      dynamiteHit: 0,
      bangsPlayed: 0,
      duelsCount: 0,
      abilitiesUsed: 0,
    };
  }
  return matchStats[playerId];
}

// Automatically posts game statistics and full TSV row to Google Forms / Google Sheets
function sendGameStatsToGoogleForms(table: GameTable, lobbyState: any, turnsCount: number) {
  const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdISHQQmdhH6ZQ-8r0xhFBRk16MOl_wiWBW1BpBPbsUH0QBFA/formResponse";

  try {
    // 1. Precise Date formatting: DD.MM.YYYY
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;

    const gameId = Math.floor(2000 + Math.random() * 8000);
    const gameTag = String(gameId);

    // Extract all player objects from table record
    const allPlayers: Player[] = Object.values(table.players);
    if (allPlayers.length === 0) return;

    // Helper to format role names cleanly (using Vice instead of Deputy)
    const formatRole = (r: string) => {
      const lower = (r || '').toLowerCase();
      if (lower === 'sheriff' || lower.includes('sheriff')) return 'Sheriff';
      if (lower === 'deputy' || lower === 'vice' || lower.includes('vice') || lower.includes('deputy')) return 'Vice';
      if (lower === 'outlaw' || lower.includes('outlaw')) return 'Outlaw';
      if (lower === 'renegade' || lower.includes('renegade')) return 'Renegade';
      return 'Unknown';
    };

    // Determine first player: in 3-player game it is Vice, in 4+ player games it is Sheriff
    let sortedPlayers: Player[] = [...allPlayers];
    const isThreePlayers = sortedPlayers.length === 3;
    const targetLeaderRole = isThreePlayers ? 'vice' : 'sheriff';

    const leaderIndex = sortedPlayers.findIndex(p => {
      const r = (p.status?.role || '').toLowerCase();
      return r === targetLeaderRole || (isThreePlayers && (r === 'deputy' || r === 'vice'));
    });

    if (leaderIndex > 0) {
      sortedPlayers = [
        ...sortedPlayers.slice(leaderIndex),
        ...sortedPlayers.slice(0, leaderIndex)
      ];
    }

    const playerCount = sortedPlayers.length;
    let botCounter = 1;
    let totalJailTimes = 0;

    // Collect summaries per player
    const playerSummaries = sortedPlayers.map((p, idx) => {
      // Character Name
      let charName = "Unknown";
      if (p.pockets?.player_character && p.pockets.player_character.length > 0) {
        try {
          const charCard = getCard(table, p.pockets.player_character[0]);
          if (charCard && 'name' in charCard.cardData) {
            charName = charCard.cardData.name;
          }
        } catch {
          // ignore
        }
      }

      // Role Name
      let roleName = formatRole(p.status?.role);
      if (idx === 0 && roleName === "Unknown") {
        roleName = isThreePlayers ? "Vice" : "Sheriff";
      }

      // Winner detection
      let isWinner = 0;
      if (p.status?.flags?.has?.('winner') || (p as any).flags?.has?.('winner')) {
        isWinner = 1;
      }

      // Real User Name vs Bot (B1, B2...)
      let rawName = "";
      const userId = p.user_id;

      if (lobbyState?.users) {
        if (Array.isArray(lobbyState.users)) {
          const u = lobbyState.users.find((user: any) => user.user_id === userId || user.id === userId);
          if (u?.name) rawName = u.name;
        } else if (typeof lobbyState.users.get === 'function') {
          rawName = lobbyState.users.get(userId)?.name || "";
        } else if (lobbyState.users[userId]) {
          rawName = lobbyState.users[userId]?.name || "";
        }
      }

      if (!rawName && (userId === table.myUserId || p.user_id === lobbyState?.myUserId)) {
        rawName = lobbyState?.myUser?.name || lobbyState?.username || "viteksysr";
      }

      rawName = String(rawName).trim();

      let finalName = "";
      if (rawName && !rawName.toUpperCase().startsWith("BOT") && !p.status?.flags?.has?.('bot' as any)) {
        finalName = rawName;
      } else {
        finalName = `B${botCounter++}`;
      }

      // Pull detailed match events
      const st = getPlayerTracker(p.id);
      totalJailTimes += st.jailCount;

      const hpEnd = p.status?.hp !== undefined ? String(p.status.hp) : (isWinner ? "1" : "0");
      const killsStr = st.kills > 0 ? String(st.kills) : "";
      const jailStr = st.jailCount > 0 ? String(st.jailCount) : "";
      const dynamiteStr = st.dynamiteHit > 0 ? String(st.dynamiteHit) : "";
      const bangsStr = st.bangsPlayed > 0 ? String(st.bangsPlayed) : "";
      const duelsStr = st.duelsCount > 0 ? String(st.duelsCount) : "";
      const abilityStr = st.abilitiesUsed > 0 ? String(st.abilitiesUsed) : "";

      return {
        id: p.id,
        name: finalName,
        character: charName,
        role: roleName,
        win: isWinner,
        score: isWinner ? (roleName === "Sheriff" || roleName === "Vice" ? 1200 : roleName === "Outlaw" ? 1800 : 2500) : 0,
        hpEnd,
        killsStr,
        jailStr,
        dynamiteStr,
        bangsStr,
        duelsStr,
        abilityStr
      };
    });

    // Detect winning faction strictly based on winner's role
    const winners = playerSummaries.filter(p => p.win === 1);
    let winningFaction = "Law";
    if (winners.length > 0) {
      const wRole = winners[0].role;
      if (wRole === "Outlaw") winningFaction = "Outlaw";
      else if (wRole === "Renegade") winningFaction = "Renegade";
      else if (wRole === "Sheriff" || wRole === "Vice") winningFaction = isThreePlayers ? "Vice" : "Law";
      else winningFaction = "Outlaw";
    }

    const durationTurns = Math.max(1, Math.round(turnsCount / Math.max(1, playerCount)));

    // Build the master Raw_Log_TSV_Row with full stats:
    // Format per player: [Char, Name, Win, Score, Dr, Rand, A, HPE, K, J, $, T, B, DB, Du]
    const tsvTokens: string[] = [
      String(gameId), String(gameId), "1", formattedDate, "", String(totalJailTimes), "",
      gameTag, "4", "", "", String(playerCount), winningFaction, String(durationTurns)
    ];

    for (let i = 0; i < 8; i++) {
      if (i < playerSummaries.length) {
        const p = playerSummaries[i];
        tsvTokens.push(
          p.character,
          p.name,
          String(p.win),
          String(p.score),
          "", // Dr
          "", // Rand
          p.abilityStr, // A
          p.hpEnd,      // HPE
          p.killsStr,   // K
          p.jailStr,    // J
          "",           // $
          String(durationTurns), // T
          p.bangsStr,   // B
          p.dynamiteStr,// DB
          p.duelsStr    // Du
        );
      } else {
        tsvTokens.push("", "", "", "", "", "", "", "", "", "", "", "", "", "", "");
      }
    }

    const fullTsvRow = tsvTokens.join("\t");

    // Exact Google Form field entry mappings
    const params = new URLSearchParams();
    params.append("entry.2088334784", String(gameId));
    params.append("entry.2052540524", formattedDate);
    params.append("entry.1348185807", gameTag);
    params.append("entry.573387725", String(playerCount));
    params.append("entry.769682595", winningFaction);
    params.append("entry.1197519006", String(durationTurns));

    // Player 1
    if (playerSummaries[0]) {
      formDataAppend(params, "entry.367341868", playerSummaries[0].character);
      formDataAppend(params, "entry.2138093364", playerSummaries[0].name);
      formDataAppend(params, "entry.1623901088", playerSummaries[0].role);
      formDataAppend(params, "entry.1834794415", String(playerSummaries[0].win));
    }

    // Player 2
    if (playerSummaries[1]) {
      formDataAppend(params, "entry.981839004", playerSummaries[1].character);
      formDataAppend(params, "entry.1854700899", playerSummaries[1].name);
      formDataAppend(params, "entry.613380711", String(playerSummaries[1].win));
    }

    // Player 3
    if (playerSummaries[2]) {
      formDataAppend(params, "entry.389129975", playerSummaries[2].character);
      formDataAppend(params, "entry.822439046", playerSummaries[2].name);
      formDataAppend(params, "entry.1963505623", String(playerSummaries[2].win));
    }

    // Player 4
    if (playerSummaries[3]) {
      formDataAppend(params, "entry.862663838", playerSummaries[3].character);
      formDataAppend(params, "entry.75423018", playerSummaries[3].name);
      formDataAppend(params, "entry.853439977", String(playerSummaries[3].win));
    }

    // Player 5
    if (playerSummaries[4]) {
      formDataAppend(params, "entry.620508871", playerSummaries[4].character);
      formDataAppend(params, "entry.1944660920", playerSummaries[4].name);
      formDataAppend(params, "entry.193026424", String(playerSummaries[4].win));
    }

    // Player 6
    if (playerSummaries[5]) {
      formDataAppend(params, "entry.747371480", playerSummaries[5].character);
      formDataAppend(params, "entry.601467444", playerSummaries[5].name);
      formDataAppend(params, "entry.1331753810", String(playerSummaries[5].win));
    }

    // Player 7
    if (playerSummaries[6]) {
      formDataAppend(params, "entry.1341787509", playerSummaries[6].character);
      formDataAppend(params, "entry.133106512", playerSummaries[6].name);
      formDataAppend(params, "entry.1475389472", String(playerSummaries[6].win));
    }

    // Player 8
    if (playerSummaries[7]) {
      formDataAppend(params, "entry.269239913", playerSummaries[7].character);
      formDataAppend(params, "entry.1153187625", playerSummaries[7].name);
      formDataAppend(params, "entry.528998003", String(playerSummaries[7].win));
    }

    // Raw TSV Row with detailed breakdown
    params.append("entry.1996936727", fullTsvRow);

    console.log("[Bang Stats] Transmitting rich match result to Google Forms:", Object.fromEntries(params.entries()));

    // Dispatch single POST request
    fetch(FORM_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params.toString()
    }).then(() => {
      console.log("[Bang Stats] Match results successfully transmitted to Google Sheets!");
    }).catch(err => {
      console.error("[Bang Stats] Submission error:", err);
    });

  } catch (err) {
    console.error("[Bang Stats] Extraction error:", err);
  }
}

function formDataAppend(params: URLSearchParams, key: string, value: string | undefined) {
  if (value !== undefined) {
    params.append(key, value);
  }
}

export default function StatusBar({ gameError, handleClearGameError, handleReturnLobby }: StatusProps) {
  const lobbyState = useContext(LobbyContext);
  const { table, selector } = useContext(GameStateContext);
  const { handleClickCard, handleConfirm, handleUndo } = useSelectorConfirm();
  const language = useLanguage();

  const isGameOver = table.status.flags.has('game_over');
  const hasSentStats = useRef(false);

  // Turn counter tracking
  const turnsCountRef = useRef(0);
  const lastTurnPlayerRef = useRef<number | undefined>(undefined);

  // Track live card actions and game events (Jail, Dynamite, Bang, Duel, Ability)
  useEffect(() => {
    if (table.status?.current_turn !== undefined && table.status.current_turn !== lastTurnPlayerRef.current) {
      lastTurnPlayerRef.current = table.status.current_turn;
      turnsCountRef.current += 1;
    }

    // Track table animations for specific card moves
    if (table.animation?.type === 'move_card') {
      const card = table.cards[table.animation.card];
      if (card && 'name' in card.cardData) {
        const name = card.cardData.name.toLowerCase();
        const currentTurnPlayer = table.status.current_turn;
        if (currentTurnPlayer !== undefined) {
          const tracker = getPlayerTracker(currentTurnPlayer);
          if (name.includes('bang')) tracker.bangsPlayed += 1;
          if (name.includes('jail') || name.includes('prigione')) tracker.jailCount += 1;
          if (name.includes('dynamite') || name.includes('dinamite')) tracker.dynamiteHit += 1;
          if (name.includes('duel') || name.includes('duello')) tracker.duelsCount += 1;
        }
      }
    }
  }, [table.status?.current_turn, table.animation, table.cards]);

  // Trigger auto-tracking exactly once on Game Over
  useEffect(() => {
    if (isGameOver && !hasSentStats.current) {
      hasSentStats.current = true;
      sendGameStatsToGoogleForms(table, lobbyState, turnsCountRef.current);
    } else if (!isGameOver) {
      hasSentStats.current = false;
    }
  }, [isGameOver, table, lobbyState]);

  const statusText = isResponse(selector) && <GameStringComponent message={selector.request.status_text} />;

  const buttonRow = getTablePocket(table, 'button_row').flatMap(id => {
    const card = getCard(table, id);
    if (selectorCanPlayCard(selector, card) || isCardCurrent(selector, card)) {
      return (
        <Button key={id} color={getCardButtonColor(card)} onClick={handleClickCard(card)}>
          { isCardKnown(card) && <LocalizedCardName name={card.cardData.name} /> }
        </Button>
      );
    }
    return [];
  });

  const timerWidget = isResponse(selector) && selector.request.timer &&
    <TimerWidget key={selector.request.timer.timer_id} duration={selector.request.timer.duration} />;

  const confirmButton = handleConfirm && <Button color='blue' onClick={handleConfirm}>{getLabel(language, 'ui', 'BUTTON_OK')}</Button>;
  const undoButton = handleUndo && <Button color='red' onClick={handleUndo}>{getLabel(language, 'ui', 'BUTTON_UNDO')}</Button>;

  if (isGameOver) {
    return <div className="status-bar">
      {getLabel(language, 'ui', 'STATUS_GAME_OVER')}
      {checkMyUserFlag(lobbyState, 'lobby_owner') && <Button color='green' onClick={handleReturnLobby}>{getLabel(language, 'ui', 'BUTTON_RETURN_LOBBY')}</Button>}
    </div>;
  } else if (gameError) {
    return <div className="status-bar status-bar-error">
      <GameStringComponent message={gameError} />
      <Button color='red' onClick={handleClearGameError}>{getLabel(language, 'ui', 'BUTTON_OK')}</Button>
    </div>;
  } else if (statusText || buttonRow.length !== 0 || confirmButton || undoButton) {
    return <div className="status-bar">
      {statusText}{timerWidget}{buttonRow}{confirmButton}{undoButton}
    </div>;
  } else {
    return null;
  }
}