import { MutableRefObject, forwardRef, useImperativeHandle, useRef } from "react";
import { getLocalizedLabel } from "../../../Locale/Locale";
import { PlayerPocketType } from "../../../Messages/CardEnums";
import LobbyUser, { UserValue } from "../../Lobby/LobbyUser";
import { GameTable, Player, getCard } from "../GameTable";
import CardView from "./CardView";
import "./PlayerView.css";
import RoleView from "./RoleView";
import { PocketPosition } from "./TableView";
import PocketView from "./PocketView";

export interface PlayerProps {
    user?: UserValue,
    table: GameTable,
    player: Player
}

export type PlayerPocketPositions = {
  [T in Extract<PlayerPocketType, string>]?: MutableRefObject<PocketPosition>;
};

export interface GetPlayerPocketPositions {
    positions: PlayerPocketPositions;
}

const PlayerView = forwardRef<GetPlayerPocketPositions, PlayerProps>(({ user, table, player }, ref) => {
    const positions: PlayerPocketPositions = {
        player_hand: useRef() as MutableRefObject<PocketPosition>,
        player_table: useRef() as MutableRefObject<PocketPosition>
    };

    useImperativeHandle(ref, () => ({ positions }));

    let className = 'player-view';
    if (player.id == table.status.current_turn) {
        className += ' current-turn';
    }

    const isAlive = !player.status.flags.includes('dead');
    const isOrigin = 'origin' in table.status.request && table.status.request.origin == player.id;
    const isTarget = 'target' in table.status.request && table.status.request.target == player.id;
    const isWinner = player.status.flags.includes('winner');

    return (
        <div className={className}>
            <LobbyUser user={user} />
            <div className="player-character">
                { player.pockets.player_character.map(id => <CardView key={id} card={getCard(table, id)} />) }
                <RoleView role={player.status.role} />
                <div>
                    { isAlive ? <div>{ player.status.hp } HP</div> : null }
                    { player.status.gold > 0 ? <div>{ player.status.gold } gold</div> : null }
                    { isOrigin ? <div style={{color: 'cyan'}}>Origin</div> : null }
                    { isTarget ? <div style={{color: 'red'}}>Target</div> : null }
                    { isWinner ? <div style={{color: 'yellow'}}>Winner</div> : null }
                </div>
            </div>
            <div className="card-pocket"><PocketView ref={positions.player_hand} table={table} cards={player.pockets.player_hand} /></div>
            <div className="card-pocket"><PocketView ref={positions.player_table} table={table} cards={player.pockets.player_table} /></div>
        </div>
    )
});

export default PlayerView;