import { CSSProperties, useContext } from "react";
import { createPortal } from "react-dom";
import Button from "../../Components/Button";
import getLabel from "../../Locale/GetLabel";
import { LobbyContext } from "../Lobby/Lobby";
import { GameTableContext, TargetSelectorContext } from "./GameScene";
import GameStringComponent, { LocalizedCardName } from "./GameStringComponent";
import { Card, getCard } from "./Model/GameTable";
import { GameString } from "./Model/GameUpdate";
import { isCardCurrent, isResponse, selectorCanPlayCard } from "./Model/TargetSelector";
import "./Style/TimerAnimation.css";

export interface StatusProps {
    gameError: GameString | undefined;
    handleClearGameError: () => void;
    handleReturnLobby: () => void;
    handleConfirm?: () => void;
    handleUndo?: () => void;
    onClickCard?: (card: Card) => void;
}

export default function StatusBar({ gameError, handleClearGameError, handleReturnLobby, handleConfirm, handleUndo, onClickCard }: StatusProps) {
    const { myUserId, lobbyOwner } = useContext(LobbyContext);
    const table = useContext(GameTableContext);
    const selector = useContext(TargetSelectorContext);

    const isGameOver = table.status.flags.includes('game_over');

    const statusText = isResponse(selector) && <GameStringComponent message={selector.request.status_text} />;
  
    const buttonRow = table.pockets.button_row.flatMap(id => {
      const card = getCard(table, id);
      const isCurrent = isCardCurrent(selector, card);
      const isPlayable = selectorCanPlayCard(selector, card);
      if (isCurrent || isPlayable) {
        const color = isResponse(selector) ? 'red' : isCurrent ? 'blue' : 'green';
        return (
          <Button key={id} color={color} onClick={onClickCard ? () => onClickCard(card) : undefined}>
            <LocalizedCardName name={card.cardData.name} />
          </Button>
        );
      } else {
        return [];
      }
    })

    const timerWidget = isResponse(selector) && selector.request.timer &&
      <div key={selector.request.timer.timer_id} className="request-timer" style={{
          '--duration': selector.request.timer.duration + 'ms'
      } as CSSProperties} />;
    
    const confirmButton = handleConfirm && <Button color='blue' onClick={handleConfirm}>{getLabel('ui', 'BUTTON_OK')}</Button>;
    const undoButton = handleUndo && <Button color='red' onClick={handleUndo}>{getLabel('ui', 'BUTTON_UNDO')}</Button>;

    let statusBar = null;

    if (isGameOver) {
      statusBar = <div className="status-bar">
        { getLabel('ui', 'STATUS_GAME_OVER') }
        { myUserId == lobbyOwner && <Button color='green' onClick={handleReturnLobby}>{getLabel('ui', 'BUTTON_RETURN_LOBBY')}</Button> }
      </div>
    } else if (gameError) {
      statusBar = <div className="status-bar status-bar-error">
        <GameStringComponent message={gameError} />
        <Button color='red' onClick={handleClearGameError}>{getLabel('ui', 'BUTTON_OK')}</Button>
      </div>
    } else if (statusText || buttonRow.length !== 0 || confirmButton || undoButton ) {
      statusBar = <div className="status-bar">
        { statusText}{ timerWidget }{ buttonRow }{ confirmButton }{ undoButton }
      </div>
    }

    if (statusBar) {
      return createPortal(statusBar, document.body);
    } else {
      return null;
    }
}