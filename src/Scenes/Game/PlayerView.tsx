import { CSSProperties, RefObject, forwardRef, useContext, useImperativeHandle, useMemo, useRef } from "react";
import { useMapRef } from "../../Utils/LazyRef";
import { Rect, getDivRect } from "../../Utils/Rect";
import LobbyUser, { UserValue } from "../Lobby/LobbyUser";
import { GameTableContext, TargetSelectorContext } from "./GameScene";
import { PocketType } from "./Model/CardEnums";
import { PocketPosition, PocketPositionMap } from "./Model/CardTracker";
import { isPlayerAlive } from "./Model/Filters";
import { Card, Player } from "./Model/GameTable";
import { CardId } from "./Model/GameUpdate";
import { PlayingSelector, TargetSelector, isPlayerSelected, isResponse, isValidEquipTarget, isValidPlayerTarget } from "./Model/TargetSelector";
import CharacterView from "./Pockets/CharacterView";
import PocketView from "./Pockets/PocketView";
import StackPocket from "./Pockets/StackPocket";
import RoleView from "./RoleView";
import "./Style/PlayerAnimations.css";
import "./Style/PlayerView.css";

export interface PlayerProps {
    user?: UserValue,
    player: Player,
    onClickCard?: (card: Card) => void;
    onClickPlayer?: (player: Player) => void;
}

function getSelectorPlayerClass(selector: TargetSelector, player: Player) {
    if (isPlayerSelected(selector, player)) {
        return 'player-selected';
    }
    switch (selector.selection.mode) {
    case 'target':
    case 'modifier':
        if (isValidPlayerTarget(selector as PlayingSelector, player)) {
            return 'player-targetable';
        }
        break;
    case 'equip':
        if (isValidEquipTarget(selector as PlayingSelector, player)) {
            return 'player-targetable';
        }
        break;
    }
    return null;
}

function clampCardRect(cardRect: Rect, pocketRect: Rect | null): Rect {
    if (pocketRect) {
        const pocketLeft = pocketRect.x;
        const pocketRight = pocketRect.x + pocketRect.w;
        if (pocketLeft < pocketRight) {
            if (cardRect.x < pocketLeft) {
                return { ...cardRect, x: pocketLeft };
            } else if (cardRect.x + cardRect.w > pocketRight) {
                return { ...cardRect, x: pocketRight - cardRect.w };
            }
        }
    }
    return cardRect;
}

function clampedPocket(pocket: PocketPosition, scrollRef: RefObject<HTMLDivElement>): PocketPosition {
    const getScrollRect = () => scrollRef.current ? getDivRect(scrollRef.current) : null;
    return {
        getPocketRect: getScrollRect,
        getCardRect: (card: CardId) => {
            const cardRect = pocket.getCardRect(card);
            if (cardRect) {
                return clampCardRect(cardRect, getScrollRect());
            } else {
                return null;
            }
        }
    };
}

const PlayerView = forwardRef<PocketPositionMap, PlayerProps>(({ user, player, onClickCard, onClickPlayer }, ref) => {
    const table = useContext(GameTableContext);
    const selector = useContext(TargetSelectorContext);
    const positions = useMapRef<PocketType, PocketPosition>();
    const handRef = useRef<HTMLDivElement>(null);
    const tableRef = useRef<HTMLDivElement>(null);
    const extraCharacters = useRef<PocketPosition>(null);

    const handleClickPlayer = onClickPlayer ? () => onClickPlayer(player) : undefined;

    useImperativeHandle(ref, () => positions);

    const setPos = (pocket: PocketType) => {
        return (value: PocketPosition | null) => {
            positions.set(pocket, value);
        };
    };

    const setScrollPositions = (scrollRef: RefObject<HTMLDivElement>, key: PocketType) => {
        return (pocket: PocketPosition | null) => {
            positions.set(key, pocket ? clampedPocket(pocket, scrollRef) : null);
        }
    };

    const isGameOver = table.status.flags.includes('game_over');
    const isTurn = player.id == table.status.current_turn;

    const selectorPlayerClass = useMemo(() => getSelectorPlayerClass(selector, player), [selector]);

    const isOrigin = isResponse(selector) && selector.request.origin == player.id;
    const isTarget = isResponse(selector) && selector.request.target == player.id;
    const isDead = !isPlayerAlive(player);
    const isWinner = player.status.flags.includes('winner');

    let classes = ['player-view'];
    if (isWinner) {
        classes.push('player-winner');
    } else if (isTurn) {
        classes.push('current-turn');
    }

    let flipDuration: number | undefined;
    let playerRole = player.status.role;

    let playerStyle = {
        '--player-hp': player.status.hp
    } as CSSProperties;
    
    if (player.animation) {
        if ('flipping_role' in player.animation) {
            flipDuration = player.animation.flipping_role.duration;
            if (player.status.role == 'unknown') {
                playerRole = player.animation.flipping_role.role;
            }
        } else if ('player_hp' in player.animation) {
            playerStyle = {
                ...playerStyle,
                '--player-hp-diff': player.status.hp - player.animation.player_hp.hp,
                '--duration': player.animation.player_hp.duration + 'ms'
            } as CSSProperties;
            classes.push('player-animation-hp');
        } else if ('player_death' in player.animation) {
            playerStyle = {
                ...playerStyle,
                '--duration': player.animation.player_death.duration + 'ms'
            } as CSSProperties;
            classes.push('player-animation-death');
        }
    } else if (selectorPlayerClass) {
        classes.push(selectorPlayerClass);
    }

    const buildCharacterRef = (character: PocketPosition | null): PocketPosition | null => {
        return {
            getPocketRect: () => null,
            getCardRect: (card: CardId) => {
                if (!extraCharacters.current || card == player.pockets.player_character.at(0)) {
                    return character?.getCardRect(card) ?? null;
                } else {
                    return extraCharacters.current.getCardRect(card);
                }
            }
        };
    };

    const characterView = (
        <CharacterView ref={ref => {
            positions.set('player_character', buildCharacterRef(ref?.characterRef.current ?? null));
            positions.set('player_backup', ref?.backupRef.current ?? null);
        }} player={player} onClickCard={onClickCard} />
    );

    const extraCharactersPocket = player.pockets.player_character.length <= 1 ? null : (
        <PocketView ref={extraCharacters} cards={player.pockets.player_character.slice(1)} onClickCard={onClickCard} />
    );

    const roleView = <RoleView flipDuration={flipDuration} role={playerRole} />;

    const playerIcons = (
        <div className='player-icons'>
            { isGameOver ? <>
                { isWinner && <div className="player-icon icon-winner"/> }
            </> : <>
                { isOrigin && <div className="player-icon icon-origin"/> }
                { isTarget && <div className="player-icon icon-target"/> }
                { isTurn && <div className="player-icon icon-turn"/> }
            </>}
            { isDead && <div className="player-icon icon-dead"/> }
        </div>);

    if (player.id == table.self_player) {
        return <div className={classes.concat('player-view-self').join(' ')} style={playerStyle} onClick={handleClickPlayer}>
            <div className='player-self-pockets'>
                <div className='player-pocket-scroll' ref={handRef}>
                    <PocketView ref={setScrollPositions(handRef, 'player_hand')} cards={player.pockets.player_hand} onClickCard={onClickCard} />
                </div>
                <div className='player-pocket-scroll' ref={tableRef}>
                    <PocketView ref={setScrollPositions(tableRef, 'player_table')} cards={player.pockets.player_table} onClickCard={onClickCard} />
                </div>
            </div>
            <div className='player-self-character'>
                <div className='player-propic-self'><LobbyUser user={user} align='vertical' /></div>
                { characterView }
                <div className='player-character-row-scroll-self'>
                    { extraCharactersPocket }{ roleView }
                </div>
                { playerIcons }
            </div>
        </div>
    } else {
        return <div className={classes.join(' ')} style={playerStyle} onClick={handleClickPlayer}>
            <div className='player-top-row'>
                { characterView }
                <div className='player-character-row-scroll' ref={handRef}>
                    { extraCharactersPocket }
                    { roleView }
                    { table.status.flags.includes('hands_shown')
                        ? <PocketView ref={setScrollPositions(handRef, 'player_hand')} cards={player.pockets.player_hand} onClickCard={onClickCard} />
                        : <StackPocket showCount slice={0} ref={setScrollPositions(handRef, 'player_hand')} cards={player.pockets.player_hand} onClickCard={onClickCard} />
                    }
                    <div className='player-propic'><LobbyUser user={user} align='horizontal' /></div>
                    {playerIcons}
                </div>
            </div>
            <div className='player-pocket-scroll' ref={tableRef}>
                <PocketView ref={setScrollPositions(tableRef, 'player_table')} cards={player.pockets.player_table} onClickCard={onClickCard} />
            </div>
        </div>
    }
});

export default PlayerView;