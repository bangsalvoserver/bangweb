import { GameOptions } from "../../Messages/GameUpdate";
import { ChangeEvent, Dispatch } from "react";

export interface LobbyOptionsProps {
    lobbyOptions: GameOptions;
    setLobbyOptions: (lobbyOptions: GameOptions) => void;
}

export default function LobbyOptionsEditor({lobbyOptions, setLobbyOptions }: LobbyOptionsProps) {
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const prop = event.target.id;
        setLobbyOptions({
            ... lobbyOptions,
            [prop]: event.target.checked
        });
    };

    const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(event.target.valueAsNumber)) {
            const prop = event.target.id;
            setLobbyOptions({
                ... lobbyOptions,
                [prop]: event.target.valueAsNumber
            });
        }
    };

    return (
        // TODO expansions
        <ul>
            <li>
                <input id="enable_ghost_cards" type="checkbox" checked={lobbyOptions.enable_ghost_cards} onChange={handleCheckboxChange} />
                <label htmlFor="enable_ghost_cards">Enable Ghost Cards</label>
            </li>
            <li>
                <input id="character_choice" type="checkbox" checked={lobbyOptions.character_choice} onChange={handleCheckboxChange} />
                <label htmlFor="character_choice">Character Choice</label>
            </li>
            <li>
                <input id="allow_beer_in_duel" type="checkbox" checked={lobbyOptions.allow_beer_in_duel} onChange={handleCheckboxChange} />
                <label htmlFor="allow_beer_in_duel">Allow Beer in Duel</label>
            </li>
            <li>
                <input id="quick_discard_all" type="checkbox" checked={lobbyOptions.quick_discard_all} onChange={handleCheckboxChange} />
                <label htmlFor="quick_discard_all">Quick Discard All</label>
            </li>
            <li>
                <label htmlFor="scenario_deck_size">Scenario Deck Size</label>
                <input id="scenario_deck_size" type="number" value={lobbyOptions.scenario_deck_size} onChange={handleNumberChange} />
            </li>
            <li>
                <label htmlFor="num_bots">Number of Bots:</label>
                <input id="num_bots" type="number" value={lobbyOptions.num_bots} onChange={handleNumberChange} />
            </li>
            <li>
                <label htmlFor="damage_timer">Damage Timer:</label>
                <input id="damage_timer" type="number" value={lobbyOptions.damage_timer} onChange={handleNumberChange} />
            </li>
            <li>
                <label htmlFor="escape_timer">Escape Timer (ms):</label>
                <input id="escape_timer" type="number" value={lobbyOptions.escape_timer} onChange={handleNumberChange} />
            </li>
            <li>
                <label htmlFor="bot_play_timer">Bot Play Timer (ms):</label>
                <input id="bot_play_timer" type="number" value={lobbyOptions.bot_play_timer} onChange={handleNumberChange} />
            </li>
            <li>
                <label htmlFor="tumbleweed_timer">Tumbleweed Timer (ms):</label>
                <input id="tumbleweed_timer" type="number" value={lobbyOptions.tumbleweed_timer} onChange={handleNumberChange} />
            </li>
        </ul>
    );
}