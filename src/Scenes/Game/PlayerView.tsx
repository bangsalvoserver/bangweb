import { CSSProperties, forwardRef, useImperativeHandle, useRef } from "react";
import LobbyUser, { UserValue } from "../Lobby/LobbyUser";
import { GameTable, Player } from "./Model/GameTable";
import PocketView, { PocketPositionMap, PocketPositionRef } from "./PocketView";
import RoleView from "./RoleView";
import "./Style/PlayerAnimations.css";
import "./Style/PlayerView.css";

export interface PlayerProps {
    user?: UserValue,
    table: GameTable,
    player: Player
}

export interface PlayerRef {
    positions: PocketPositionMap
};

const PlayerView = forwardRef<PlayerRef, PlayerProps>(({ user, table, player }, ref) => {
    const positions: PocketPositionMap = {
        player_hand: useRef() as PocketPositionRef,
        player_table: useRef() as PocketPositionRef,
        player_character: useRef() as PocketPositionRef,
        player_backup: useRef() as PocketPositionRef,
    };

    useImperativeHandle(ref, () => ({ positions }));

    const isGameOver = table.status.flags.includes('game_over');
    const isTurn = player.id == table.status.current_turn;

    let classes = ['player-view'];
    if (isTurn) {
        classes.push('current-turn');
    }

    const isOrigin = 'origin' in table.status.request && table.status.request.origin == player.id;
    const isTarget = 'target' in table.status.request && table.status.request.target == player.id;
    const isWinner = player.status.flags.includes('winner');

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
        }
    }

    return (
        <div className={classes.join(' ')} style={playerStyle}>
            <div className='flex flex-col justify-center flex-grow'>
                <div className='pocket-scroll'>
                    <PocketView ref={positions.player_hand} table={table} cards={player.pockets.player_hand} />
                </div>
                <div className='pocket-scroll'>
                    <PocketView ref={positions.player_table} table={table} cards={player.pockets.player_table} />
                </div>
            </div>
            <div className='flex flex-col'>
                <div className='flex flex-row flex-grow justify-end'>
                    { isGameOver ? <>
                        { isWinner ? <div className="player-icon icon-winner"/> : null }
                    </> : <>
                        { isOrigin ? <div className="player-icon icon-origin"/> : null }
                        { isTarget ? <div className="player-icon icon-target"/> : null }
                        { isTurn ? <div className="player-icon icon-turn"/> : null }
                    </>}
                </div>
                <div className='flex flex-row'>
                    <div className='flex flex-col justify-end relative'>
                        <div className="player-backup">
                            <PocketView ref={positions.player_backup} table={table} cards={player.pockets.player_backup} />
                            { player.status.hp > 5 ? 
                                <div className="player-backup-extra">
                                    <PocketView table={table} cards={player.pockets.player_backup.slice(-1)} />
                                </div> : null }
                        </div>
                        <PocketView ref={positions.player_character} table={table} cards={player.pockets.player_character} />
                        { player.status.gold > 0 ?
                            <div className="player-gold">{player.status.gold}</div>
                        : null }
                    </div>
                    <div className='flex flex-col'>
                        <LobbyUser user={user} alignVertical />
                        <div className='flex flex-row justify-center'>
                            <RoleView flipDuration={flipDuration} role={playerRole} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default PlayerView;