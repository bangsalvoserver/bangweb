import { CSSProperties, useContext } from "react";
import { getRectCenter } from "../../../Utils/Rect";
import useUpdateEveryFrame from "../../../Utils/UseUpdateEveryFrame";
import { LobbyContext, getUser } from "../../Lobby/Lobby";
import { GameTableContext } from "../GameScene";
import { CardTracker } from "../Model/CardTracker";
import { PlayerMoveId, getPlayer } from "../Model/GameTable";
import { Milliseconds, PlayerId } from "../Model/GameUpdate";
import PlayerView from "../PlayerView";
import "./Style/MovePlayersAnimation.css";

interface MovePlayerProps {
    tracker: CardTracker;
    from: PlayerId;
    to: PlayerId;
    duration: Milliseconds;
}

function MovePlayerAnimation({ tracker, from, to, duration }: MovePlayerProps) {
    const table = useContext(GameTableContext);
    const { users } = useContext(LobbyContext);

    const [startRect, endRect] = useUpdateEveryFrame(() => [
        tracker.getPlayerPockets(from)?.getPlayerRect(),
        tracker.getPlayerPockets(to)?.getPlayerRect()
    ]);

    if (startRect) {
        const startPoint = getRectCenter(startRect);
        const endPoint = getRectCenter(endRect ?? startRect);

        const style = {
            '--startX': startPoint.x + 'px',
            '--startY': startPoint.y + 'px',
            '--diffX': (endPoint.x - startPoint.x) + 'px',
            '--diffY': (endPoint.y - startPoint.y) + 'px',
            '--duration': duration + 'ms'
        } as CSSProperties;

        const player = getPlayer(table, from);
        const user = getUser(users, player.userid);

        return <div style={style} className="move-player-animation">
            <div className="move-player-inner">
                <PlayerView user={user} player={player} />
            </div>
        </div>
    } else {
        return null;
    }
}

export interface MovePlayersProps {
    tracker: CardTracker;
    players: PlayerMoveId[];
    duration: Milliseconds;
}

export default function MovePlayersAnimation({ tracker, players, duration }: MovePlayersProps) {
    return <>{players.map(p => <MovePlayerAnimation key={p.from} tracker={tracker} from={p.from} to={p.to} duration={duration} />)}</>;
}