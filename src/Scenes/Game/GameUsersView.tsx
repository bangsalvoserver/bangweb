import { useContext, useMemo } from "react";
import { UserId, UserValue } from "../../Model/ServerMessage";
import useCloseOnLoseFocus from "../../Utils/UseCloseOnLoseFocus";
import { getUser, LobbyContext } from "../Lobby/Lobby";
import LobbyUser from "../Lobby/LobbyUser";
import { GameStateContext } from "./GameScene";
import { isPlayerDead, isPlayerGhost } from "./Model/Filters";
import { Player } from "./Model/GameTable";
import "./Style/GameUsersView.css";

interface GameUserProps {
    player?: Player;
    user: UserValue;
    myUserId: UserId;
}

function getRoleIcon(player: Player | undefined): string | undefined {
    switch (player?.status.role) {
    case 'sheriff':
        return 'icon-sheriff';
    case 'outlaw':
    case 'outlaw_3p':
        return 'icon-outlaw';
    case 'deputy':
    case 'deputy_3p':
        return 'icon-deputy';
    case 'renegade':
    case 'renegade_3p':
        return 'icon-renegade';
    }
}

function GameUserPlayer({ player, user, myUserId }: GameUserProps) {
    const playerIcons = useMemo(() => {
        const role = getRoleIcon(player);
        const isWinner = player && player.status.flags.includes('winner');
        return <div className="game-player-icons">
            { role && <div className={`player-icon ${role}`}/> }
            { isWinner && <div className="player-icon icon-winner"/> }
            { player && isPlayerDead(player) && (isPlayerGhost(player)
                ? <div className="player-icon icon-ghost"/>
                : <div className="player-icon icon-dead"/> ) }
        </div>;
    }, [player]);

    return <LobbyUser align='horizontal' user={user} isSelf={myUserId === user.user_id}>
        { playerIcons }
    </LobbyUser>;
}

export default function GameUsersView() {
    const [isPanelOpen, setIsPanelOpen, panelRef] = useCloseOnLoseFocus<HTMLDivElement>();

    const { users, myUserId } = useContext(LobbyContext);
    const { table } = useContext(GameStateContext);

    const gameUserPlayers = useMemo(() => {
        let players: [UserValue, Player | undefined][] = [];
        
        for (const player of table.players) {
            players.push([ getUser(users, player.user_id), player ]);
        }

        for (const user of users) {
            if (!user.flags.includes('disconnected') && user.flags.includes('spectator')) {
                players.push([ user, undefined ]);
            }
        }

        return players.map(([user, player]) =>
            <GameUserPlayer key={user.user_id} player={player} user={user} myUserId={myUserId} />
        );
    }, [users, myUserId, table.players]);

    return <div ref={panelRef} className="game-users-outer">
        <button className='
                w-8 h-8 md:w-12 md:h-12 relative
                p-2 ml-1 text-sm rounded-full focus:outline-none focus:ring-2 text-gray-400 bg-gray-600 hover:bg-gray-700 focus:ring-gray-800
            ' onClick={() => setIsPanelOpen(!isPanelOpen)}>
                <svg fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.13 80.13">
                <g>
                    <path d="M48.355,17.922c3.705,2.323,6.303,6.254,6.776,10.817c1.511,0.706,3.188,1.112,4.966,1.112
                        c6.491,0,11.752-5.261,11.752-11.751c0-6.491-5.261-11.752-11.752-11.752C53.668,6.35,48.453,11.517,48.355,17.922z M40.656,41.984
                        c6.491,0,11.752-5.262,11.752-11.752s-5.262-11.751-11.752-11.751c-6.49,0-11.754,5.262-11.754,11.752S34.166,41.984,40.656,41.984
                        z M45.641,42.785h-9.972c-8.297,0-15.047,6.751-15.047,15.048v12.195l0.031,0.191l0.84,0.263
                        c7.918,2.474,14.797,3.299,20.459,3.299c11.059,0,17.469-3.153,17.864-3.354l0.785-0.397h0.084V57.833
                        C60.688,49.536,53.938,42.785,45.641,42.785z M65.084,30.653h-9.895c-0.107,3.959-1.797,7.524-4.47,10.088
                        c7.375,2.193,12.771,9.032,12.771,17.11v3.758c9.77-0.358,15.4-3.127,15.771-3.313l0.785-0.398h0.084V45.699
                        C80.13,37.403,73.38,30.653,65.084,30.653z M20.035,29.853c2.299,0,4.438-0.671,6.25-1.814c0.576-3.757,2.59-7.04,5.467-9.276
                        c0.012-0.22,0.033-0.438,0.033-0.66c0-6.491-5.262-11.752-11.75-11.752c-6.492,0-11.752,5.261-11.752,11.752
                        C8.283,24.591,13.543,29.853,20.035,29.853z M30.589,40.741c-2.66-2.551-4.344-6.097-4.467-10.032
                        c-0.367-0.027-0.73-0.056-1.104-0.056h-9.971C6.75,30.653,0,37.403,0,45.699v12.197l0.031,0.188l0.84,0.265
                        c6.352,1.983,12.021,2.897,16.945,3.185v-3.683C17.818,49.773,23.212,42.936,30.589,40.741z"/>
                </g>
                </svg>
        </button>
        <div className={'game-users-box ' + (!isPanelOpen ? 'invisible' : '')}>
            { gameUserPlayers }
        </div>
    </div>;
}