import { CSSProperties, forwardRef, useContext, useImperativeHandle } from "react";
import { setMapRef, useRefLazy } from "../../Utils/LazyRef";
import LobbyUser, { UserValue } from "../Lobby/LobbyUser";
import CharacterView from "./CharacterView";
import CountPocket from "./CountPocket";
import { GameTableContext, RequestContext } from "./GameScene";
import { PocketType } from "./Model/CardEnums";
import { Player } from "./Model/GameTable";
import PocketView, { PocketPosition, PocketPositionMap } from "./PocketView";
import RoleView from "./RoleView";
import ScenarioDeckView from "./ScenarioDeckView";
import "./Style/PlayerAnimations.css";
import "./Style/PlayerView.css";

export interface PlayerProps {
    user?: UserValue,
    player: Player
}

const PlayerView = forwardRef<PocketPositionMap, PlayerProps>(({ user, player }, ref) => {
    const table = useContext(GameTableContext);
    const request = useContext(RequestContext);
    const positions = useRefLazy(() => new Map<PocketType, PocketPosition>());

    useImperativeHandle(ref, () => positions.current);

    const isGameOver = table.status.flags.includes('game_over');
    const isTurn = player.id == table.status.current_turn;

    let classes = ['player-view'];
    if (isTurn) {
        classes.push('current-turn');
    }

    const isOrigin = 'origin' in request && request.origin == player.id;
    const isTarget = 'target' in request && request.target == player.id;
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

    const characterView = (
        <CharacterView ref={ref => {
            setMapRef(positions, 'player_character')(ref?.characterRef.current ?? null);
            setMapRef(positions, 'player_backup')(ref?.backupRef.current ?? null);
        }} player={player} />
    );

    const roleView = (
        <div className='pocket-view-height'>
            <RoleView flipDuration={flipDuration} role={playerRole} />
        </div>
    );

    const scenarioDecks = (<>
        <ScenarioDeckView ref={setMapRef(positions, 'scenario_deck')} pocket='scenario_deck' player={player.id} />
        <ScenarioDeckView ref={setMapRef(positions, 'wws_scenario_deck')} pocket='wws_scenario_deck' player={player.id} />
    </>);

    const playerIcons = (
        <div className='player-icons'>
            { isGameOver ? <>
                { isWinner ? <div className="player-icon icon-winner"/> : null }
            </> : <>
                { isOrigin ? <div className="player-icon icon-origin"/> : null }
                { isTarget ? <div className="player-icon icon-target"/> : null }
                { isTurn ? <div className="player-icon icon-turn"/> : null }
            </>}
        </div>);

    if (player.id == table.self_player) {
        return <div className={classes.concat('player-view-self').join(' ')} style={playerStyle}>
            <div>
                <div className='player-pocket-scroll'>
                    <PocketView ref={setMapRef(positions, 'player_hand')} cards={player.pockets.player_hand} />
                </div>
                <div className='player-pocket-scroll'>
                    <PocketView ref={setMapRef(positions, 'player_table')} cards={player.pockets.player_table} />
                </div>
            </div>
            <div className='flex flex-col relative justify-end'>
                {playerIcons}
                <div className='flex flex-row'>
                    <div className="flex flex-col justify-end">{characterView}</div>
                    <div className='flex flex-col'>
                        <LobbyUser user={user} alignVertical />
                        { roleView } { scenarioDecks }
                    </div>
                </div>
            </div>
        </div>
    } else {
        return <div className={classes.join(' ')} style={playerStyle}>
            <div className='flex flex-row flex-grow'>
                <div className='flex-grow text-center'>
                    <div className='player-top-row'>
                        { characterView } { roleView }
                        <CountPocket ref={setMapRef(positions, 'player_hand')} trackAllCards cards={player.pockets.player_hand} />
                        { scenarioDecks }
                    </div>
                </div>
                <div className='flex flex-col justify-end relative'>
                    {playerIcons}
                    <LobbyUser user={user} alignVertical />
                </div>
            </div>
            <div className='player-pocket-scroll'>
                <PocketView ref={setMapRef(positions, 'player_table')} cards={player.pockets.player_table} />
            </div>
        </div>
    }
});

export default PlayerView;