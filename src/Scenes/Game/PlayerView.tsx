import { forwardRef, useImperativeHandle, useRef } from "react";
import LobbyUser, { UserValue } from "../Lobby/LobbyUser";
import { GameTable, Player } from "./Model/GameTable";
import PocketView, { PocketPositionMap, PocketPositionRef } from "./PocketView";
import RoleView from "./RoleView";
import "./Style/PlayerView.css";

export interface PlayerProps {
    user?: UserValue,
    table: GameTable,
    player: Player
}

const PlayerView = forwardRef<PocketPositionMap, PlayerProps>(({ user, table, player }, ref) => {
    const positions: PocketPositionMap = {
        player_hand: useRef() as PocketPositionRef,
        player_table: useRef() as PocketPositionRef,
        player_character: useRef() as PocketPositionRef,
    };

    useImperativeHandle(ref, () => positions);

    let className = 'player-view';
    if (player.id == table.status.current_turn) {
        className += ' current-turn';
    }

    const isAlive = !player.status.flags.includes('dead');
    const isOrigin = 'origin' in table.status.request && table.status.request.origin == player.id;
    const isTarget = 'target' in table.status.request && table.status.request.target == player.id;
    const isWinner = player.status.flags.includes('winner');

    let flipDuration: number | undefined;
    let playerRole = player.status.role;
    
    if (player.animation) {
        if ('flipping_role' in player.animation) {
            flipDuration = player.animation.flipping_role.duration;
            if (player.status.role == 'unknown') {
                playerRole = player.animation.flipping_role.role;
            }
        }
    }

    return (
        <div className={className}>
            <div className='flex flex-col'>
                <div className='player-pocket'><PocketView ref={positions.player_hand} table={table} cards={player.pockets.player_hand} /></div>
                <div className='player-pocket'><PocketView ref={positions.player_table} table={table} cards={player.pockets.player_table} /></div>
            </div>
            <div className='flex flex-col'>
                <div className='flex flex-col flex-grow text-right'>
                    { /* TODO swap these with icons */ }
                    { isOrigin ? <div style={{color: 'cyan'}}>Origin</div> : null }
                    { isTarget ? <div style={{color: 'red'}}>Target</div> : null }
                    { isWinner ? <div style={{color: 'yellow'}}>Winner</div> : null }
                </div>
                <div className='flex flex-row'>
                    <div className='flex flex-col'>
                        <div className='flex flex-col flex-grow text-center justify-end'>
                            { /* TODO add player_backup and gold nuggets */ }
                            { player.status.gold > 0 ? <div>{ player.status.gold } gold</div> : null }
                            { isAlive ? <div>{ player.status.hp } HP</div> : null }
                        </div>
                        <PocketView ref={positions.player_character} table={table} cards={player.pockets.player_character} />
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