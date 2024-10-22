import { CSSProperties, Ref, RefObject, useContext, useImperativeHandle, useRef } from "react";
import Button from "../../Components/Button";
import getLabel from "../../Locale/GetLabel";
import { getDivRect, Rect } from "../../Utils/Rect";
import { useMapRef } from "../../Utils/UseMapRef";
import LobbyUser, { UserValue } from "../Lobby/LobbyUser";
import { GameStateContext } from "./GameScene";
import { PocketType } from "./Model/CardEnums";
import { PlayerRef, PocketRef } from "./Model/CardTracker";
import { isPlayerDead, isPlayerGhost } from "./Model/Filters";
import { GameTable, Player } from "./Model/GameTable";
import { CardId } from "./Model/GameUpdate";
import { isPlayerSelected, isResponse, isValidEquipTarget, isValidPlayerTarget, TargetSelector } from "./Model/TargetSelector";
import { SelectorConfirmContext } from "./Model/UseSelectorConfirm";
import PocketView from "./Pockets/PocketView";
import StackPocket from "./Pockets/StackPocket";
import RoleView from "./RoleView";
import "./Style/PlayerAnimations.css";
import "./Style/PlayerView.css";

export interface PlayerProps {
    playerRef?: Ref<PlayerRef>;
    user: UserValue;
    player: Player;
    handleRejoin?: () => void;
}

function getSelectorPlayerClass(table: GameTable, selector: TargetSelector, player: Player): string {
    if (isPlayerSelected(selector, player.id)) {
        return 'player-selected';
    }
    switch (selector.mode) {
    case 'preselect':
    case 'target':
    case 'modifier':
        if (isValidPlayerTarget(table, selector, player)) {
            return 'player-targetable';
        }
        break;
    case 'equip':
        if (isValidEquipTarget(table, selector, player)) {
            return 'player-targetable';
        }
        break;
    }
    return '';
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

function clampedPocket(pocket: PocketRef, scrollRef: RefObject<HTMLDivElement>): PocketRef {
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

export default function PlayerView({ playerRef, user, player, handleRejoin }: PlayerProps) {
    const { table, selector } = useContext(GameStateContext);
    const { handleClickPlayer } = useContext(SelectorConfirmContext);

    const pocketRefs = useMapRef<PocketType, PocketRef>();
    const divRef = useRef<HTMLDivElement>(null);
    const handRef = useRef<HTMLDivElement>(null);
    const tableRef = useRef<HTMLDivElement>(null);
    const extraCharacters = useRef<PocketRef>(null);

    useImperativeHandle(playerRef, () => ({
        getPlayerRect: () => divRef.current ? getDivRect(divRef.current) : null,
        getPocket: pocket => pocketRefs.get(pocket)
    }));

    const setRef = (key: PocketType) => (value: PocketRef | null) => pocketRefs.set(key, value);
    const setRefScroll = (scrollRef: RefObject<HTMLDivElement>, key: PocketType) => {
        return (pocket: PocketRef | null) => {
            pocketRefs.set(key, pocket ? clampedPocket(pocket, scrollRef) : null);
        }
    };

    const isGameOver = table.status.flags.includes('game_over');
    const isTurn = player.id === table.status.current_turn;

    const isPlayerSelf = player.id === table.self_player;
    const isOrigin = isResponse(selector) && selector.request.origin === player.id;
    const isTarget = isResponse(selector) && selector.request.target === player.id;
    const isDead = isPlayerDead(player);
    const isGhost = isPlayerGhost(player);
    const isWinner = player.status.flags.includes('winner');
    const isSkipTurn = player.status.flags.includes('skip_turn');
    
    const isDisconnected = user.flags.includes('disconnected');
    const canRejoin = !table.self_player && isDisconnected && !isGameOver;

    let classes = ['player-view'];
    if (isWinner) {
        classes.push('player-winner');
    } else if (isTurn) {
        classes.push('current-turn');
    }

    let flipDuration: number | undefined;
    let playerRole = player.status.role;

    let playerStyle: CSSProperties | undefined = undefined;
    let fromPlayerHp = player.status.hp;
    
    let roleKey: number | null = null;
    switch (player.animation.type) {
    case 'flipping_role':
        roleKey = player.animation.key;
        flipDuration = player.animation.duration;
        if (player.status.role === 'unknown') {
            playerRole = player.animation.role;
        }
        break;
    case 'player_hp':
        fromPlayerHp = player.animation.hp;
        playerStyle = {
            '--duration': player.animation.duration + 'ms'
        } as CSSProperties;
        break;
    case 'player_death':
        playerStyle = {
            '--duration': player.animation.duration + 'ms'
        } as CSSProperties;
        classes.push('player-animation-death');
        break;
    case 'none':
        classes.push(getSelectorPlayerClass(table, selector, player));
    }

    if (isPlayerSelf) {
        classes.push('player-view-self');
    }

    const buildCharacterRef = (character: PocketRef | null) => {
        pocketRefs.set('player_character', {
            getPocketRect: () => null,
            getCardRect: (card: CardId) => {
                if (!extraCharacters.current || card === player.pockets.player_character.at(0)) {
                    return character?.getCardRect(card) ?? null;
                } else {
                    return extraCharacters.current.getCardRect(card);
                }
            }
        });
    };

    return <div ref={divRef} className={classes.join(' ')} style={playerStyle} onClick={handleClickPlayer(player)}>
        <div className='player-top-row'>
            <div className='player-character'>
                <div className='absolute'>
                    <StackPocket pocketRef={buildCharacterRef} cards={player.pockets.player_backup} />
                </div>
                <StackPocket pocketRef={setRef('player_backup')} cards={player.pockets.player_character.slice(0, 1)} />
            </div>
            <div className='player-hand' ref={handRef}>
                <div className='player-role'>
                    { player.pockets.player_character.length > 1 && 
                        <PocketView pocketRef={extraCharacters} cards={player.pockets.player_character.slice(1)} /> }
                    <div className='stack-pocket'>
                        <RoleView key={roleKey} flipDuration={flipDuration} role={playerRole} />
                    </div>
                </div>
                { (isPlayerSelf || table.status.flags.includes('hands_shown'))
                    ? <div className='player-hand-inner'>
                        <PocketView pocketRef={setRefScroll(handRef, 'player_hand')} cards={player.pockets.player_hand} />
                      </div>
                    : <StackPocket showCount slice={0} pocketRef={setRefScroll(handRef, 'player_hand')} cards={player.pockets.player_hand} />
                }
            </div>
            <div className='player-lifepoints'>
                {[...Array(Math.max(0, player.status.hp, fromPlayerHp))].map((_, i) =>
                    <div key={i} className={'player-lifepoint' + (i >= fromPlayerHp ? ' lifepoint-fade-in' : i >= player.status.hp ? ' lifepoint-fade-out' : '')}>
                        <div className='player-lifepoint-inner'><img src='/media/icon_lifepoint.png' alt="" /></div>
                    </div>
                )}
            </div>
            { player.status.gold > 0 && <div className='player-gold'>{player.status.gold}</div> }
        </div>
        <div className='player-table' ref={tableRef}>
            <PocketView pocketRef={setRefScroll(tableRef, 'player_table')} cards={player.pockets.player_table} />
        </div>
        <div className='player-icons'>
            { isGameOver ? <>
                { isWinner && <div className="player-icon icon-winner"/> }
            </> : <>
                { isOrigin && <div className="player-icon icon-origin"/> }
                { isTarget && <div className="player-icon icon-target"/> }
                { isTurn && <div className="player-icon icon-turn"/> }
                { isSkipTurn && <div className="player-icon icon-skip-turn"/> }
            </>}
            { isDead && (isGhost
                ? <div className="player-icon icon-ghost"/>
                : <div className="player-icon icon-dead"/> ) }
        </div>
        <div className='player-propic'>
            <LobbyUser user={user} align='horizontal'>
                { canRejoin && <Button className="button-rejoin" onClick={handleRejoin} color="green">{getLabel('ui','BUTTON_REJOIN')}</Button> }
            </LobbyUser>
        </div>
    </div>
}