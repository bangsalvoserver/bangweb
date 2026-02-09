import { useContext } from "react";
import Button, { ButtonColor } from "../../Components/Button";
import TimerWidget from "../../Components/TimerWidget";
import { getLabel, useLanguage } from "../../Locale/Registry";
import { checkMyUserFlag } from "../../Model/SceneState";
import { LobbyContext } from "../Lobby/Lobby";
import { GameStateContext } from "./GameScene";
import GameStringComponent, { LocalizedCardName } from "./GameStringComponent";
import { getTagValue } from "./Model/Filters";
import { getCard, getTablePocket, KnownCard } from "./Model/GameTable";
import { GameString } from "./Model/GameUpdate";
import { useSelectorConfirm } from "./Model/SelectorConfirm";
import { isCardCurrent, isResponse, selectorCanPlayCard } from "./Model/TargetSelector";

export interface StatusProps {
  gameError: GameString | undefined;
  handleClearGameError: () => void;
  handleReturnLobby: () => void;
}

function getCardButtonColor(card: KnownCard): ButtonColor {
  switch (getTagValue(card, 'button_color')) {
  case 0:
  default:
    return 'green';
  case 1:
    return 'red'
  case 2:
    return 'blue';
  }
}

export default function StatusBar({ gameError, handleClearGameError, handleReturnLobby }: StatusProps) {
  const lobbyState = useContext(LobbyContext);
  const { table, selector } = useContext(GameStateContext);
  const { handleClickCard, handleConfirm, handleUndo } = useSelectorConfirm();
  const language = useLanguage();

  const isGameOver = table.status.flags.has('game_over');

  const statusText = isResponse(selector) && <GameStringComponent message={selector.request.status_text} />;

  const buttonRow = getTablePocket(table, 'button_row').flatMap(id => {
    const card = getCard(table, id);
    if (selectorCanPlayCard(selector, card) || isCardCurrent(selector, card)) {
      return (
        <Button key={id} color={getCardButtonColor(card)} onClick={handleClickCard(card)}>
          <LocalizedCardName name={card.cardData.name} />
        </Button>
      );
    }
    return [];
  })

  const timerWidget = isResponse(selector) && selector.request.timer &&
    <TimerWidget key={selector.request.timer.timer_id} duration={selector.request.timer.duration} />;

  const confirmButton = handleConfirm && <Button color='blue' onClick={handleConfirm}>{getLabel(language, 'ui', 'BUTTON_OK')}</Button>;
  const undoButton = handleUndo && <Button color='red' onClick={handleUndo}>{getLabel(language, 'ui', 'BUTTON_UNDO')}</Button>;

  if (isGameOver) {
    return <div className="status-bar">
      {getLabel(language, 'ui', 'STATUS_GAME_OVER')}
      {checkMyUserFlag(lobbyState, 'lobby_owner') && <Button color='green' onClick={handleReturnLobby}>{getLabel(language, 'ui', 'BUTTON_RETURN_LOBBY')}</Button>}
    </div>
  } else if (gameError) {
    return <div className="status-bar status-bar-error">
      <GameStringComponent message={gameError} />
      <Button color='red' onClick={handleClearGameError}>{getLabel(language, 'ui', 'BUTTON_OK')}</Button>
    </div>
  } else if (statusText || buttonRow.length !== 0 || confirmButton || undoButton) {
    return <div className="status-bar">
      {statusText}{timerWidget}{buttonRow}{confirmButton}{undoButton}
    </div>
  } else {
    return null;
  }
}