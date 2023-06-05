import { CSSProperties, forwardRef, useContext, useImperativeHandle } from "react";
import { setMapRef, useMapRef } from "../../Utils/MapRef";
import LobbyUser, { UserValue } from "../Lobby/LobbyUser";
import CharacterView from "./CharacterView";
import CountPocket from "./CountPocket";
import { GameTableContext } from "./GameScene";
import { PocketType } from "./Model/CardEnums";
import { Player } from "./Model/GameTable";
import PocketView, { PocketPosition, PocketPositionMap } from "./PocketView";
import RoleView from "./RoleView";
import "./Style/PlayerAnimations.css";
import "./Style/PlayerView.css";

export interface PlayerProps {
    user?: UserValue,
    player: Player
}

export interface PlayerRef {
    positions: PocketPositionMap
};

const PlayerView = forwardRef<PlayerRef, PlayerProps>(({ user, player }, ref) => {
    const table = useContext(GameTableContext);
    const positions = useMapRef<PocketType, PocketPosition>();

    useImperativeHandle(ref, () => ({ positions : positions.current }));

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
            <div className='flex flex-row flex-grow'>
                <div className='flex flex-col justify-center relative'>
                    <LobbyUser user={user} alignVertical />
                    <div className='player-icons'>
                        { isGameOver ? <>
                            { isWinner ? <div className="player-icon icon-winner"/> : null }
                        </> : <>
                            { isTurn ? <div className="player-icon icon-turn"/> : null }
                            { isOrigin ? <div className="player-icon icon-origin"/> : null }
                            { isTarget ? <div className="player-icon icon-target"/> : null }
                        </>}
                    </div>
                </div>
                <div className='flex-grow text-center'>
                    <div className='inline-block text-left mt-4'>
                        <CharacterView ref={ref => {
                            setMapRef(positions, 'player_character')(ref?.characterRef.current ?? null);
                            setMapRef(positions, 'player_backup')(ref?.backupRef.current ?? null);
                        }} player={player} />
                        <div className='pocket-view-height'>
                            <RoleView flipDuration={flipDuration} role={playerRole} />
                        </div>
                        <CountPocket ref={setMapRef(positions, 'player_hand')} trackAllCards cards={player.pockets.player_hand} />
                    </div>
                </div>
            </div>
            <div className='player-table'>
                <PocketView ref={setMapRef(positions, 'player_table')} cards={player.pockets.player_table} />
            </div>
        </div>
    )
});

export default PlayerView;