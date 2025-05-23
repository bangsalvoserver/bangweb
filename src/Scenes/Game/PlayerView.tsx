import { CSSProperties, Ref, RefObject, useContext, useImperativeHandle, useRef } from "react";
import Button from "../../Components/Button";
import PlayerIcon from "../../Components/PlayerIcon";
import getLabel from "../../Locale/GetLabel";
import { UserValue } from "../../Model/ServerMessage";
import { getDivRect, Rect } from "../../Utils/Rect";
import { useMapRef } from "../../Utils/UseMapRef";
import LobbyUser from "../Lobby/LobbyUser";
import { getTokenSprite } from "./CardView";
import { GameStateContext } from "./GameScene";
import { PocketType, TokenType } from "./Model/CardEnums";
import { PlayerRef, PocketRef } from "./Model/CardTracker";
import { isPlayerDead, isPlayerGhost } from "./Model/Filters";
import { GameTable, getCard, Player } from "./Model/GameTable";
import { CardId, GameOptions } from "./Model/GameUpdate";
import { useSelectorConfirm } from "./Model/SelectorConfirm";
import { isPlayerSelected, isPlayerSkipped, isResponse, isValidEquipTarget, isValidPlayerTarget, TargetSelector } from "./Model/TargetSelector";
import PocketView from "./Pockets/PocketView";
import StackPocket from "./Pockets/StackPocket";
import RoleView from "./RoleView";
import "./Style/PlayerAnimations.css";
import "./Style/PlayerView.css";

export interface PlayerProps {
    gameOptions?: GameOptions;
    playerRef?: Ref<PlayerRef>;
    user: UserValue;
    player: Player;
    handleRejoin?: () => void;
}

function getSelectorPlayerClass(table: GameTable, selector: TargetSelector, player: Player): string {
    if (isPlayerSkipped(selector, player)) {
        return 'player-skipped';
    }
    if (isPlayerSelected(selector, player)) {
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

export default function PlayerView({ playerRef, gameOptions, user, player, handleRejoin }: PlayerProps) {
    const { table, selector } = useContext(GameStateContext);
    const { handleClickPlayer } = useSelectorConfirm();

    const pocketRefs = useMapRef<PocketType, PocketRef>();
    const divRef = useRef<HTMLDivElement>(null);
    const handRef = useRef<HTMLDivElement>(null);
    const tableRef = useRef<HTMLDivElement>(null);
    const tokensRef = useRef<HTMLDivElement>(null);
    const extraCharacters = useRef<PocketRef>(null);

    useImperativeHandle(playerRef, () => ({
        getPlayerRect: () => divRef.current ? getDivRect(divRef.current) : null,
        getPocket: pocket => pocketRefs.get(pocket),
        getTokensRect: () => tokensRef.current ? getDivRect(tokensRef.current) : null,
    }), [pocketRefs]);

    const setRefScroll = (scrollRef: RefObject<HTMLDivElement>, key: PocketType) => {
        return (pocket: PocketRef | null) => {
            pocketRefs.set(key, pocket ? clampedPocket(pocket, scrollRef) : null);
        }
    };

    const isGameOver = table.status.flags.has('game_over');
    const isTurn = player.id === table.status.current_turn;

    const isHandShown = player.id === table.self_player
        || table.status.flags.has('hands_shown')
        || (player.status.flags.has('show_hand_playing') && table.self_player === table.status.current_turn);
    
    const isOrigin = isResponse(selector) && selector.request.origin === player.id;
    const isTarget = isResponse(selector) && selector.request.target === player.id;
    const isDead = isPlayerDead(player);
    const isGhost = isPlayerGhost(player);
    const isWinner = player.status.flags.has('winner');
    const isSkipTurn = player.status.flags.has('skip_turn');
    const hasDynamiteStick = player.status.flags.has('stick_of_dynamite');
    
    const isDisconnected = user.flags.has('disconnected');
    const isRejoinableBot = user.user_id < 0 && (gameOptions?.allow_bot_rejoin ?? false);
    const canRejoin = !table.self_player && (isDisconnected || isRejoinableBot) && !isGameOver;

    let classes = ['player-view'];
    if (isWinner) {
        classes.push('player-winner');
    } else if (isTurn) {
        classes.push('current-turn');
    }

    let playerStyle: CSSProperties | undefined = undefined;
    let fromPlayerHp = player.status.hp;
    
    switch (player.animation.type) {
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

    if (player.id === table.self_player) {
        classes.push('player-view-self');
    }
    
    let tokens: [TokenType, number][] = [];
    const characterId = player.pockets.player_character.at(0);
    if (characterId && characterId > 0) {
        tokens = Object.entries(getCard(table, characterId).tokens)
            .filter(([token, count]) => token !== 'cube' && count > 0) as [TokenType, number][];
    }

    const buildCharacterRef = (character: PocketRef | null) => {
        pocketRefs.set('player_character', {
            getPocketRect: () => null,
            getCardRect: (card: CardId) => {
                if (!extraCharacters.current || card === characterId) {
                    return character?.getCardRect(card) ?? null;
                } else {
                    return extraCharacters.current.getCardRect(card);
                }
            }
        });
    };

    return <div ref={divRef} className={classes.join(' ')} style={playerStyle} onClick={handleClickPlayer(player)}>
        { player.animation.type === 'player_death' ?
            <div className='player-top-row'>
                <StackPocket cards={player.pockets.player_character} />
                <RoleView player={player} />
            </div>
        : <>
            <div className='player-top-row'>
                <div className='player-character'>
                    <StackPocket pocketRef={buildCharacterRef} cards={player.pockets.player_character.slice(0, 1)} />
                </div>
                <div className='player-hand' ref={handRef}>
                    <div className='player-role'>
                        { player.pockets.player_character.length > 1 && 
                            <PocketView pocketRef={extraCharacters} cards={player.pockets.player_character.slice(1)} /> }
                        <div className='stack-pocket'>
                            <RoleView player={player} />
                        </div>
                    </div>
                    { isHandShown
                        ? <div className='player-hand-inner'>
                            <PocketView pocketRef={setRefScroll(handRef, 'player_hand')} cards={player.pockets.player_hand} />
                        </div>
                        : <StackPocket showCount pocketRef={setRefScroll(handRef, 'player_hand')} cards={player.pockets.player_hand} />
                    }
                </div>
                <div className='player-lifepoints'>
                    {[...Array(Math.max(0, player.status.hp, fromPlayerHp))].map((_, i) =>
                        <div key={i} className={'player-lifepoint' + (i >= fromPlayerHp ? ' lifepoint-fade-in' : i >= player.status.hp ? ' lifepoint-fade-out' : '')}>
                            <div className='player-lifepoint-inner'><img src='/media/icon_lifepoint.png' alt="" /></div>
                        </div>
                    )}
                </div>
                <div className='player-tokens' ref={tokensRef}>
                    {tokens.map(([token, count]) => <div className='player-tokens-inner'>
                        <img key={token} src={getTokenSprite(token)} alt="" />{ count }
                    </div>)}
                </div>
            </div>
            <div className='player-table' ref={tableRef}>
                <PocketView pocketRef={setRefScroll(tableRef, 'player_table')} cards={player.pockets.player_table} />
            </div>
        </>}
        <div className='player-icons'>
            { isGameOver ? <>
                { isWinner && <PlayerIcon name="icon-winner" /> }
            </> : <>
                { isOrigin && <PlayerIcon name="icon-origin"/> }
                { isTarget && <PlayerIcon name="icon-target"/> }
                { isTurn && <PlayerIcon name="icon-turn"/> }
                { isSkipTurn && <PlayerIcon name="icon-skip-turn"/> }
                { hasDynamiteStick && <PlayerIcon name="icon-dynamite"/> }
            </>}
            { isDead && <PlayerIcon name={isGhost ? "icon-ghost" : "icon-dead"} /> }
        </div>
        <div className='player-propic'>
            <LobbyUser user={user} align='horizontal' noUserIcons>
                { canRejoin && <Button className="button-rejoin" onClick={handleRejoin} color="green">{getLabel('ui','BUTTON_REJOIN')}</Button> }
            </LobbyUser>
        </div>
    </div>
}