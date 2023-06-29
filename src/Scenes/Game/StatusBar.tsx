import { useContext } from "react";
import { GameTableContext, TargetSelectorContext } from "./GameScene";
import { createPortal } from "react-dom";
import { LobbyContext } from "../Lobby/Lobby";
import getLabel from "../../Locale/GetLabel";
import Button from "../../Components/Button";
import { isCardCurrent, isResponse, selectorCanPlayCard } from "./Model/TargetSelector";
import GameStringComponent, { LocalizedCardName } from "./GameStringComponent";
import { Card, getCard } from "./Model/GameTable";
import { GameString } from "./Model/GameUpdate";

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
        { statusText}{ buttonRow }{ confirmButton }{ undoButton }
      </div>
    }

    if (statusBar) {
      return createPortal(statusBar, document.body);
    } else {
      return null;
    }
}