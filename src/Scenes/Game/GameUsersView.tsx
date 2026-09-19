import { useContext, useMemo } from "react";
import { USERS_ICON } from "../../Components/Icons/UsersIcon";
import { UserId, UserValue } from "../../Model/ServerMessage";
import useCloseOnLoseFocus from "../../Utils/UseCloseOnLoseFocus";
import { getUser, LobbyContext } from "../Lobby/Lobby";
import LobbyUser from "../Lobby/LobbyUser";
import { GameStateContext } from "./GameScene";
import { isAlive, isGhost } from "./Model/Filters";
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
        const isWinner = player && player.status.flags.has('winner');
        let icons: string[] = [];
        if (role) icons.push(role);
        if (isWinner) icons.push('icon-winner');
        if (player) {
            if (isAlive(player)) {
                if (isGhost(player)) icons.push('icon-ghost');
            } else {
                icons.push('icon-dead');
            }
        }
        return icons;
    }, [player]);

    return <LobbyUser align='horizontal' user={user} isSelf={myUserId === user.user_id} playerIcons={playerIcons} />;
}

export default function GameUsersView() {
    const [isPanelOpen, setIsPanelOpen, panelRef] = useCloseOnLoseFocus<HTMLDivElement>();

    const { users, myUserId } = useContext(LobbyContext);
    const { table } = useContext(GameStateContext);

    const gameUserPlayers = useMemo(() => {
        let players: [UserValue, Player | undefined][] = [];
        
        for (const player of Object.values(table.players)) {
            players.push([ getUser(users, player.user_id), player ]);
        }

        for (const user of users) {
            if (!user.flags.has('disconnected') && user.flags.has('spectator')) {
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
            { USERS_ICON }
        </button>
        <div className={'game-users-box ' + (!isPanelOpen ? 'invisible' : '')}>
            { gameUserPlayers }
        </div>
    </div>;
}