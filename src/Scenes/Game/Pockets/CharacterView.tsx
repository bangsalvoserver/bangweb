import { MutableRefObject, forwardRef, useImperativeHandle, useRef } from "react";
import { Card, Player } from "../Model/GameTable";
import PocketView from "../Pockets/PocketView";
import { PocketPosition } from "../Model/CardTracker";

export interface CharacterProps {
    player: Player;
    onClickCard?: (card: Card) => void;
}

export interface CharacterRef {
    characterRef: MutableRefObject<PocketPosition | null>;
    backupRef: MutableRefObject<PocketPosition | null>;
}

const CharacterView = forwardRef<CharacterRef, CharacterProps>(({ player, onClickCard }, ref) => {
    const characterRef = {
        characterRef: useRef<PocketPosition>(null),
        backupRef: useRef<PocketPosition>(null)
    };

    useImperativeHandle(ref, () => characterRef);

    return (<div className='inline-block relative'>
        <div className="player-backup align-slot">
            <PocketView ref={characterRef.backupRef} cards={player.pockets.player_backup} />
            { player.status.hp > 5 ? 
                <div className="player-backup-extra">
                    <PocketView cards={player.pockets.player_backup} />
                </div> : null }
        </div>
        <div className="align-slot">
            <PocketView ref={characterRef.characterRef} cards={player.pockets.player_character.slice(0, 1)} onClickCard={onClickCard} />
        </div>
        { player.status.gold > 0 ?
            <div className="player-gold">{player.status.gold}</div>
        : null }
    </div>)
});

export default CharacterView;