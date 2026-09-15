import "../../App.css";
import BangLogo from "../../Components/BangLogo";
import Button from "../../Components/Button";
import Collapsible from "../../Components/Collapsible";
import { getLabel, Language, LanguageProvider, useLanguage } from "../../Locale/Registry";
import Env from "../../Model/Env";
import { downloadCsv } from "../../Utils/FileUtils";
import useFetch from "../../Utils/UseFetch";
import { getLocalizedCardName } from "../Game/GameStringComponent";
import { GameOptions } from "../Game/Model/GameUpdate";
import GameOptionsEditor from "../Lobby/GameOptionsEditor";
import "./Style/GameStats.css";

interface PlayerStats {
    bangs_played: number;
    ability_uses: number;
    dynamite_explosions: number;
    prison_turns_skipped: number;
    duels_lost: number;
    kills: number;
    cards_drawn: number;
    damage_dealt: number;
    hp_recovered: number;
    draw_checks_total: number;
    draw_checks_lucky: number;
    bonus_draws_used: number;
    volcanic_bangs_played: number;
}

interface PlayerGameReport {
    user_id: number;
    username: string;
    is_bot: boolean;
    character: string;
    role: string;
    survived: boolean;
    won: boolean;
    elimination_order: number;
    died_on_round: number;
    stats: PlayerStats;
}

interface GameReport {
    game_id: number;
    lobby_id: number;
    started_at: number;
    ended_at: number;
    num_players: number;
    num_rounds: number;
    expansions: string[];
    options: GameOptions;
    players: PlayerGameReport[];
}

function getBaseRole(role: string): string {
    return role.replace(/_3p$/, '');
}

function getLocalizedRole(language: Language, role: string): string {
    const key = 'icon-' + getBaseRole(role);
    return getLabel(language, 'PlayerIcon', key);
}

function sortPlayers(players: PlayerGameReport[]): PlayerGameReport[] {
    return [...players].sort((a, b) => {
        if (a.won !== b.won) return a.won ? -1 : 1;
        if (a.survived !== b.survived) return a.survived ? -1 : 1;
        return b.stats.kills - a.stats.kills;
    });
}

function formatLuck(total: number, lucky: number): string {
    return total === 0 ? '-' : `${lucky}/${total} (${Math.round(lucky / total * 100)}%)`;
}

function formatOrNone(value: number): string {
    return value === 0 ? '-' : value.toString();
}

function GameStatsTable({ game }: { game: GameReport }) {
    const language = useLanguage();
    const players = sortPlayers(game.players);

    const yesNo = (value: boolean) => getLabel(language, 'ui', value ? 'BUTTON_YES' : 'BUTTON_NO');

    const handleDownloadCsv = () => {
        const header = [
            getLabel(language, 'GameStats', 'COLUMN_PLAYER'),
            getLabel(language, 'GameStats', 'COLUMN_CHARACTER'),
            getLabel(language, 'GameStats', 'COLUMN_ROLE'),
            getLabel(language, 'GameStats', 'COLUMN_SURVIVED'),
            getLabel(language, 'GameStats', 'COLUMN_WON'),
            getLabel(language, 'GameStats', 'COLUMN_BANGS_PLAYED'),
            getLabel(language, 'GameStats', 'COLUMN_ABILITY_USES'),
            getLabel(language, 'GameStats', 'COLUMN_DYNAMITE_EXPLOSIONS'),
            getLabel(language, 'GameStats', 'COLUMN_PRISON_TURNS'),
            getLabel(language, 'GameStats', 'COLUMN_DUELS_LOST'),
            getLabel(language, 'GameStats', 'COLUMN_KILLS'),
            getLabel(language, 'GameStats', 'COLUMN_ELIMINATION_ORDER'),
            getLabel(language, 'GameStats', 'COLUMN_DIED_ROUND'),
            getLabel(language, 'GameStats', 'COLUMN_CARDS_DRAWN'),
            getLabel(language, 'GameStats', 'COLUMN_DAMAGE_DEALT'),
            getLabel(language, 'GameStats', 'COLUMN_HP_RECOVERED'),
            getLabel(language, 'GameStats', 'COLUMN_DRAW_CHECKS_TOTAL'),
            getLabel(language, 'GameStats', 'COLUMN_DRAW_CHECKS_LUCKY'),
            getLabel(language, 'GameStats', 'COLUMN_BONUS_DRAWS'),
            getLabel(language, 'GameStats', 'COLUMN_EXTRA_BANGS'),
        ];
        const rows = players.map(player => [
            player.username,
            getLocalizedCardName(language, player.character),
            getLocalizedRole(language, player.role),
            yesNo(player.survived),
            yesNo(player.won),
            player.stats.bangs_played.toString(),
            player.stats.ability_uses.toString(),
            player.stats.dynamite_explosions.toString(),
            player.stats.prison_turns_skipped.toString(),
            player.stats.duels_lost.toString(),
            player.stats.kills.toString(),
            player.elimination_order.toString(),
            player.died_on_round.toString(),
            player.stats.cards_drawn.toString(),
            player.stats.damage_dealt.toString(),
            player.stats.hp_recovered.toString(),
            player.stats.draw_checks_total.toString(),
            player.stats.draw_checks_lucky.toString(),
            player.stats.bonus_draws_used.toString(),
            player.stats.volcanic_bangs_played.toString(),
        ]);
        downloadCsv(`bang_game_${game.game_id}.csv`, [header, ...rows]);
    };

    return <>
        <h1 className="game-stats-title">{getLabel(language, 'GameStats', 'TITLE')}</h1>
        <div className="game-stats-subtitle">{getLabel(language, 'GameStats', 'NUM_ROUNDS')}: {game.num_rounds}</div>
        <div className="overflow-x-auto w-full">
            <table className="game-stats-table min-w-full border-collapse text-center">
                <thead>
                    <tr>
                        <th>{getLabel(language, 'GameStats', 'COLUMN_PLAYER')}</th>
                        <th>{getLabel(language, 'GameStats', 'COLUMN_CHARACTER')}</th>
                        <th>{getLabel(language, 'GameStats', 'COLUMN_ROLE')}</th>
                        <th>{getLabel(language, 'GameStats', 'COLUMN_SURVIVED')}</th>
                        <th>{getLabel(language, 'GameStats', 'COLUMN_WON')}</th>
                        <th>{getLabel(language, 'GameStats', 'COLUMN_BANGS_PLAYED')}</th>
                        <th>{getLabel(language, 'GameStats', 'COLUMN_ABILITY_USES')}</th>
                        <th>{getLabel(language, 'GameStats', 'COLUMN_DYNAMITE_EXPLOSIONS')}</th>
                        <th>{getLabel(language, 'GameStats', 'COLUMN_PRISON_TURNS')}</th>
                        <th>{getLabel(language, 'GameStats', 'COLUMN_DUELS_LOST')}</th>
                        <th>{getLabel(language, 'GameStats', 'COLUMN_KILLS')}</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map(player => (
                        <tr key={player.user_id} className={player.won ? 'game-stats-winner' : ''}>
                            <td className="font-medium">{player.username}</td>
                            <td>{getLocalizedCardName(language, player.character)}</td>
                            <td>{getLocalizedRole(language, player.role)}</td>
                            <td>{yesNo(player.survived)}</td>
                            <td>{yesNo(player.won)}</td>
                            <td>{player.stats.bangs_played}</td>
                            <td>{player.stats.ability_uses}</td>
                            <td>{player.stats.dynamite_explosions}</td>
                            <td>{player.stats.prison_turns_skipped}</td>
                            <td>{player.stats.duels_lost}</td>
                            <td>{player.stats.kills}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <Collapsible label={getLabel(language, 'GameStats', 'EXTENDED_TITLE')} storageKey="game-stats-extended" defaultExpanded={false}>
            <div className="overflow-x-auto w-full">
                <table className="game-stats-table min-w-full border-collapse text-center">
                    <thead>
                        <tr>
                            <th>{getLabel(language, 'GameStats', 'COLUMN_PLAYER')}</th>
                            <th>{getLabel(language, 'GameStats', 'COLUMN_ELIMINATION_ORDER')}</th>
                            <th>{getLabel(language, 'GameStats', 'COLUMN_DIED_ROUND')}</th>
                            <th>{getLabel(language, 'GameStats', 'COLUMN_CARDS_DRAWN')}</th>
                            <th>{getLabel(language, 'GameStats', 'COLUMN_DAMAGE_DEALT')}</th>
                            <th>{getLabel(language, 'GameStats', 'COLUMN_HP_RECOVERED')}</th>
                            <th>{getLabel(language, 'GameStats', 'COLUMN_DRAW_LUCK')}</th>
                            <th>{getLabel(language, 'GameStats', 'COLUMN_BONUS_DRAWS')}</th>
                            <th>{getLabel(language, 'GameStats', 'COLUMN_EXTRA_BANGS')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map(player => (
                            <tr key={player.user_id} className={player.won ? 'game-stats-winner' : ''}>
                                <td className="font-medium">{player.username}</td>
                                <td>{formatOrNone(player.elimination_order)}</td>
                                <td>{formatOrNone(player.died_on_round)}</td>
                                <td>{player.stats.cards_drawn}</td>
                                <td>{player.stats.damage_dealt}</td>
                                <td>{player.stats.hp_recovered}</td>
                                <td>{formatLuck(player.stats.draw_checks_total, player.stats.draw_checks_lucky)}</td>
                                <td>{player.stats.bonus_draws_used}</td>
                                <td>{player.stats.volcanic_bangs_played}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Collapsible>
        <Collapsible label={getLabel(language, 'GameStats', 'GAME_CONFIG_TITLE')} storageKey="game-stats-config" defaultExpanded={false}>
            <GameOptionsEditor gameOptions={game.options} />
        </Collapsible>
        <div className="flex justify-center mt-4">
            <Button color='blue' onClick={handleDownloadCsv}>{getLabel(language, 'GameStats', 'BUTTON_DOWNLOAD_CSV')}</Button>
        </div>
    </>;
}

function GameStatsInner({ gameId }: { gameId: string }) {
    const language = useLanguage();

    const gamesUrl = Env.bangGamesUrl + '/' + gameId;
    const report = useFetch<GameReport>(gamesUrl);

    if (!report) {
        return <div className="game-stats-subtitle">{getLabel(language, 'GameStats', 'LOADING')}</div>;
    }
    return <GameStatsTable game={report} />;
}

export default function GameStatsScene() {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get('game');

    return gameId && <LanguageProvider>
        <div className="game-stats-scene">
            <BangLogo />
            <div className="game-stats-panel">
                <GameStatsInner gameId={gameId} />
            </div>
        </div>
    </LanguageProvider>;
}
