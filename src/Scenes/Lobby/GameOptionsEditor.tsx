import { GameOptions } from "../../Messages/GameUpdate";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface GameOptionProps {
    gameOptions: GameOptions;
    setGameOptions: Dispatch<SetStateAction<GameOptions>>;
}

type FilteredKeys<T, U> = { [P in keyof T]: T[P] extends U ? P : never }[keyof T];
type GameOptionsOf<T> = { [Property in FilteredKeys<GameOptions, T>]: GameOptions[Property] };

export default function GameOptionsEditor({ gameOptions, setGameOptions }: GameOptionProps) {
    const newExpansionCheckbox = (name: string, label: string) => {
        const handleExpansionChange = (event: ChangeEvent<HTMLInputElement>) => {
            const oldValue = gameOptions.expansions.includes(name);
            const newValue = event.target.checked;
            if (oldValue != newValue) {
                setGameOptions({
                    ... gameOptions,
                    expansions: newValue
                        ? gameOptions.expansions.concat(name)
                        : gameOptions.expansions.filter(e => e != name)
                });
            }
        };

        return (<>
            <input id={name} type="checkbox" checked={gameOptions.expansions.includes(name)} onChange={handleExpansionChange} />
            <label htmlFor={name}>{label}</label>
        </>);
    };

    const newOptionCheckbox = function(prop: keyof GameOptionsOf<boolean>, label: string) {
        return (<>
            <input id={prop} type="checkbox" checked={gameOptions[prop]}
            onChange={event => {
                setGameOptions({
                    ... gameOptions,
                    [prop]: event.target.checked
                });
            }} />
            <label htmlFor={prop}>{label}</label>
        </>)
    };

    const newOptionNumber = function(prop: keyof GameOptionsOf<number>, label: string) {
        return (<>
            <label htmlFor={prop}>{label}</label>
            <input id={prop} type="number" value={gameOptions[prop]}
            onChange={event => {
                if (!isNaN(event.target.valueAsNumber)) {
                    setGameOptions({
                        ... gameOptions,
                        [prop]: event.target.valueAsNumber
                    });
                }
            }} />
        </>);
    };

    return (
        <ul>
            <li>{newExpansionCheckbox('dodgecity', 'Dodge City')}</li>
            <li>{newExpansionCheckbox('goldrush', 'Gold Rush')}</li>
            <li>{newExpansionCheckbox('armedanddangerous', 'Armed & Dangerous')}</li>
            <li>{newExpansionCheckbox('greattrainrobbery', 'Great Train Robbery')}</li>
            <li>{newExpansionCheckbox('valleyofshadows', 'Valley Of Shadows')}</li>
            <li>{newExpansionCheckbox('highnoon', 'High Noon')}</li>
            <li>{newExpansionCheckbox('fistfulofcards', 'Fistful Of Cards')}</li>
            <li>{newExpansionCheckbox('wildwestshow', 'Wild West Show')}</li>
            <li>{newExpansionCheckbox('thebullet', 'The Bullet')}</li>
            <li>{newOptionCheckbox('enable_ghost_cards', 'Enable Ghost Cards')}</li>
            <li>{newOptionCheckbox('character_choice', 'Character Choice')}</li>
            <li>{newOptionCheckbox('allow_beer_in_duel', 'Allow Beer in Duel')}</li>
            <li>{newOptionCheckbox('quick_discard_all', 'Quick Discard All')}</li>
            <li>{newOptionNumber('scenario_deck_size', 'Scenario Deck Size')}</li>
            <li>{newOptionNumber('num_bots', 'Number of Bots')}</li>
            <li>{newOptionNumber('damage_timer', 'Damage Timer (ms):')}</li>
            <li>{newOptionNumber('escape_timer', 'Escape Timer (ms):')}</li>
            <li>{newOptionNumber('bot_play_timer', 'Bot Play Timer (ms):')}</li>
            <li>{newOptionNumber('tumbleweed_timer', 'Tumbleweed Timer (ms):')}</li>
        </ul>
    );
}