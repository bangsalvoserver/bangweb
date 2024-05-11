import { useContext } from "react";
import Button from "../../Components/Button";
import TimerWidget from "../../Components/TimerWidget";
import getLabel from "../../Locale/GetLabel";
import { isLobbyOwner } from "../../Model/SceneState";
import { LobbyContext } from "../Lobby/Lobby";
import { GameTableContext } from "./GameScene";
import GameStringComponent, { LocalizedCardName, getLocalizedCardName } from "./GameStringComponent";
import { getCard } from "./Model/GameTable";
import { GameString } from "./Model/GameUpdate";
import { isCardCurrent, isResponse, selectorCanPlayCard } from "./Model/TargetSelector";
import { SelectorConfirmContext } from "./Model/UseSelectorConfirm";

export interface StatusProps {
  gameError: GameString | undefined;
  handleClearGameError: () => void;
  handleReturnLobby: () => void;
}

export default function StatusBar({ gameError, handleClearGameError, handleReturnLobby }: StatusProps) {
  const lobbyState = useContext(LobbyContext);
  const table = useContext(GameTableContext);
  const { handleClickCard, handleConfirm, handleDismiss, handleUndo } = useContext(SelectorConfirmContext);

  const selector = table.selector;

  const isGameOver = table.status.flags.includes('game_over');

  const statusText = isResponse(selector) && <GameStringComponent message={selector.request.status_text} />;

  const buttonRow = table.pockets.button_row.flatMap(id => {
    const card = getCard(table, id);
    const isCurrent = isCardCurrent(selector, card);
    const isPlayable = selectorCanPlayCard(selector, card);
    if (isCurrent || isPlayable) {
      const color = isResponse(selector) ? 'red' : isCurrent ? 'blue' : 'green';
      return (
        <Button key={id} color={color} onClick={handleClickCard(card)}>
          <LocalizedCardName name={card.cardData.name} />
        </Button>
      );
    } else {
      return [];
    }
  })

  const timerWidget = isResponse(selector) && selector.request.timer &&
    <TimerWidget key={selector.request.timer.timer_id} duration={selector.request.timer.duration} />;

  const confirmButton = handleConfirm && <Button color='blue' onClick={handleConfirm}>{getLabel('ui', 'BUTTON_OK')}</Button>;
  const dismissButton = handleDismiss && <Button color='red' onClick={handleDismiss}>{getLocalizedCardName('GAME_CONFIRM')}</Button>;
  const undoButton = handleUndo && <Button color='red' onClick={handleUndo}>{getLabel('ui', 'BUTTON_UNDO')}</Button>;

  if (isGameOver) {
    return <div className="status-bar">
      {getLabel('ui', 'STATUS_GAME_OVER')}
      {isLobbyOwner(lobbyState) && <Button color='green' onClick={handleReturnLobby}>{getLabel('ui', 'BUTTON_RETURN_LOBBY')}</Button>}
    </div>
  } else if (gameError) {
    return <div className="status-bar status-bar-error">
      <GameStringComponent message={gameError} />
      <Button color='red' onClick={handleClearGameError}>{getLabel('ui', 'BUTTON_OK')}</Button>
    </div>
  } else if (statusText || buttonRow.length !== 0 || confirmButton || undoButton) {
    return <div className="status-bar">
      {statusText}{timerWidget}{buttonRow}{confirmButton}{dismissButton}{undoButton}
    </div>
  } else {
    return null;
  }
}