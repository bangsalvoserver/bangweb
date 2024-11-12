import { useContext } from "react";
import Button, { ButtonColor } from "../../Components/Button";
import TimerWidget from "../../Components/TimerWidget";
import getLabel from "../../Locale/GetLabel";
import { checkMyUserFlag } from "../../Model/SceneState";
import { LobbyContext } from "../Lobby/Lobby";
import { GameStateContext } from "./GameScene";
import GameStringComponent, { LocalizedCardName } from "./GameStringComponent";
import { getTagValue } from "./Model/Filters";
import { getCard, KnownCard } from "./Model/GameTable";
import { GameString } from "./Model/GameUpdate";
import { isCardCurrent, isResponse, selectorCanPlayCard } from "./Model/TargetSelector";
import { SelectorConfirmContext } from "./Model/UseSelectorConfirm";

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
  const { handleClickCard, handleConfirm, handleUndo } = useContext(SelectorConfirmContext);

  const isGameOver = table.status.flags.includes('game_over');

  const statusText = isResponse(selector) && <GameStringComponent message={selector.request.status_text} />;

  const buttonRow = table.pockets.button_row.flatMap(id => {
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

  const confirmButton = handleConfirm && <Button color='blue' onClick={handleConfirm}>{getLabel('ui', 'BUTTON_OK')}</Button>;
  const undoButton = handleUndo && <Button color='red' onClick={handleUndo}>{getLabel('ui', 'BUTTON_UNDO')}</Button>;

  if (isGameOver) {
    return <div className="status-bar">
      {getLabel('ui', 'STATUS_GAME_OVER')}
      {checkMyUserFlag(lobbyState, 'lobby_owner') && <Button color='green' onClick={handleReturnLobby}>{getLabel('ui', 'BUTTON_RETURN_LOBBY')}</Button>}
    </div>
  } else if (gameError) {
    return <div className="status-bar status-bar-error">
      <GameStringComponent message={gameError} />
      <Button color='red' onClick={handleClearGameError}>{getLabel('ui', 'BUTTON_OK')}</Button>
    </div>
  } else if (statusText || buttonRow.length !== 0 || confirmButton || undoButton) {
    return <div className="status-bar">
      {statusText}{timerWidget}{buttonRow}{confirmButton}{undoButton}
    </div>
  } else {
    return null;
  }
}