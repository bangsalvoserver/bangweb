import { MutableRefObject, forwardRef, useImperativeHandle, useRef } from "react";
import { Card, Player } from "../Model/GameTable";
import PocketView from "../Pockets/PocketView";
import { PocketPosition } from "../Model/CardTracker";
import StackPocket from "./StackPocket";

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

    return <div className='inline-block relative'>
        <div className='absolute'><StackPocket ref={characterRef.backupRef} cards={player.pockets.player_backup} /></div>
        <StackPocket ref={characterRef.characterRef} cards={player.pockets.player_character.slice(0, 1)} onClickCard={onClickCard} />
        { player.status.gold > 0 && <div className="player-gold">{player.status.gold}</div> }
    </div>;
});

export default CharacterView;