import { CSSProperties, RefObject, forwardRef, useContext, useImperativeHandle, useMemo, useRef } from "react";
import { Rect, getDivRect } from "../../Utils/Rect";
import useMapRef from "../../Utils/UseMapRef";
import LobbyUser, { UserValue } from "../Lobby/LobbyUser";
import { GameTableContext } from "./GameScene";
import { PocketType } from "./Model/CardEnums";
import { PlayerRef, PocketPosition } from "./Model/CardTracker";
import { isPlayerDead, isPlayerGhost } from "./Model/Filters";
import { Card, GameTable, Player } from "./Model/GameTable";
import { CardId } from "./Model/GameUpdate";
import { PlayingSelectorTable, isPlayerSelected, isResponse, isValidEquipTarget, isValidPlayerTarget } from "./Model/TargetSelector";
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

function getSelectorPlayerClass(table: GameTable, player: Player) {
    const selector = table.selector;
    if (isPlayerSelected(selector, player)) {
        return 'player-selected';
    }
    switch (selector.selection.mode) {
    case 'target':
    case 'modifier':
        if (isValidPlayerTarget(table as PlayingSelectorTable, player)) {
            return 'player-targetable';
        }
        break;
    case 'equip':
        if (isValidEquipTarget(table as PlayingSelectorTable, player)) {
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

const PlayerView = forwardRef<PlayerRef, PlayerProps>(({ user, player, onClickCard, onClickPlayer }, ref) => {
    const table = useContext(GameTableContext);
    const selector = table.selector;
    const positions = useMapRef<PocketType, PocketPosition>();
    const playerDivRef = useRef<HTMLDivElement>(null);
    const handRef = useRef<HTMLDivElement>(null);
    const tableRef = useRef<HTMLDivElement>(null);
    const extraCharacters = useRef<PocketPosition>(null);

    const handleClickPlayer = onClickPlayer ? () => onClickPlayer(player) : undefined;

    useImperativeHandle(ref, () => ({
        getPlayerRect: () => playerDivRef.current ? getDivRect(playerDivRef.current) : null,
        getPocket: pocket => positions.get(pocket)
    }));

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

    const selectorPlayerClass = useMemo(() => getSelectorPlayerClass(table, player), [selector]);

    const isPlayerSelf = player.id == table.self_player;
    const isOrigin = isResponse(selector) && selector.request.origin == player.id;
    const isTarget = isResponse(selector) && selector.request.target == player.id;
    const isDead = isPlayerDead(player);
    const isGhost = isPlayerGhost(player);
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

    let fromPlayerHp = player.status.hp;
    
    let roleKey: number | null = null;
    if (player.animation) {
        if ('flipping_role' in player.animation) {
            roleKey = player.animationKey;
            flipDuration = player.animation.flipping_role.duration;
            if (player.status.role == 'unknown') {
                playerRole = player.animation.flipping_role.role;
            }
        } else if ('player_hp' in player.animation) {
            fromPlayerHp = player.animation.player_hp.hp;
            playerStyle = {
                ...playerStyle,
                '--duration': player.animation.player_hp.duration + 'ms'
            } as CSSProperties;
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

    if (isPlayerSelf) {
        classes.push('player-view-self');
    }

    const buildCharacterRef = (character: PocketPosition | null) => {
        positions.set('player_character', {
            getPocketRect: () => null,
            getCardRect: (card: CardId) => {
                if (!extraCharacters.current || card == player.pockets.player_character.at(0)) {
                    return character?.getCardRect(card) ?? null;
                } else {
                    return extraCharacters.current.getCardRect(card);
                }
            }
        });
    };

    return <div ref={playerDivRef} className={classes.join(' ')} style={playerStyle} onClick={handleClickPlayer}>
        <div className='player-top-row'>
            <div className='player-character'>
                <div className='absolute'>
                    <StackPocket ref={buildCharacterRef} cards={player.pockets.player_backup} />
                </div>
                <StackPocket ref={setPos('player_backup')} cards={player.pockets.player_character.slice(0, 1)} onClickCard={onClickCard} />
            </div>
            <div className='player-hand' ref={handRef}>
                <div className='player-role'>
                    { player.pockets.player_character.length > 1 && 
                        <PocketView ref={extraCharacters} cards={player.pockets.player_character.slice(1)} onClickCard={onClickCard} /> }
                    <div className='stack-pocket'>
                        <RoleView key={roleKey} flipDuration={flipDuration} role={playerRole} />
                    </div>
                </div>
                { (isPlayerSelf || table.status.flags.includes('hands_shown'))
                    ? <div className='player-hand-inner'>
                        <PocketView ref={setScrollPositions(handRef, 'player_hand')} cards={player.pockets.player_hand} onClickCard={onClickCard} />
                      </div>
                    : <StackPocket showCount slice={0} ref={setScrollPositions(handRef, 'player_hand')} cards={player.pockets.player_hand} onClickCard={onClickCard} />
                }
            </div>
            <div className='player-lifepoints'>
                {[...Array(Math.max(0, player.status.hp, fromPlayerHp))].map((_, i) =>
                    <div key={i} className={'player-lifepoint' + (i >= fromPlayerHp ? ' lifepoint-fade-in' : i >= player.status.hp ? ' lifepoint-fade-out' : '')}>
                        <div className='player-lifepoint-inner'><img src='/media/icon_lifepoint.png' /></div>
                    </div>
                )}
            </div>
            { player.status.gold > 0 && <div className='player-gold'>{player.status.gold}</div> }
        </div>
        <div className='player-table' ref={tableRef}>
            <PocketView ref={setScrollPositions(tableRef, 'player_table')} cards={player.pockets.player_table} onClickCard={onClickCard} />
        </div>
        <div className='player-icons'>
            { isGameOver ? <>
                { isWinner && <div className="player-icon icon-winner"/> }
            </> : <>
                { isOrigin && <div className="player-icon icon-origin"/> }
                { isTarget && <div className="player-icon icon-target"/> }
                { isTurn && <div className="player-icon icon-turn"/> }
            </>}
            { isDead && (isGhost
                ? <div className="player-icon icon-ghost"/>
                : <div className="player-icon icon-dead"/> ) }
        </div>
        <div className='player-propic'>
            <LobbyUser user={user} align='horizontal' />
        </div>
    </div>
});

export default PlayerView;