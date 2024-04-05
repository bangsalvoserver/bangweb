import { ChangeEvent, KeyboardEvent } from "react";
import getLabel from "../../Locale/GetLabel";
import { ExpansionType } from "../Game/Model/CardEnums";
import { GameOptions } from "../Game/Model/GameUpdate";
import './Style/GameOptionsEditor.css';
import { boolConverter, useLocalStorage } from "../../Utils/UseLocalStorage";
import Tooltip from "../../Components/Tooltip";

export interface GameOptionProps {
    gameOptions: GameOptions;
    setGameOptions: (gameOptions: GameOptions) => void;
    readOnly: boolean;
}

type FilteredKeys<T, U> = { [P in keyof T]: T[P] extends U ? P : never }[keyof T];
type GameOptionsOf<T> = keyof { [Property in FilteredKeys<Required<GameOptions>, T>]: unknown };

function ExpansionCheckbox({ name, gameOptions, setGameOptions, readOnly }: GameOptionProps & { name: ExpansionType }) {
    const handleExpansionChange = (event: ChangeEvent<HTMLInputElement>) => {
        const oldValue = gameOptions.expansions.includes(name);
        const newValue = event.target.checked;
        if (oldValue !== newValue) {
            setGameOptions({
                ...gameOptions,
                expansions: newValue
                    ? gameOptions.expansions.concat(name)
                    : gameOptions.expansions.filter(e => e !== name)
            });
        }
    };

    return (<div className="option-checkbox">
        <input id={name} type="checkbox"
            checked={gameOptions.expansions.includes(name)}
            onChange={readOnly ? undefined : handleExpansionChange}
            readOnly={readOnly}
        />
        <label htmlFor={name}>{getLabel('ExpansionType', name)}</label>
    </div>);
}

function UnofficialExpansionCheckbox(props: GameOptionProps & { enabled: boolean | undefined } & { name: ExpansionType }) {
    if (props.gameOptions.expansions.includes(props.name) || props.enabled) {
        return <ExpansionCheckbox { ...props } />;
    } else {
        return null;
    }
}

function OptionCheckbox({ prop, gameOptions, setGameOptions, readOnly }: GameOptionProps & { prop: GameOptionsOf<boolean> }) {
    const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setGameOptions({
            ...gameOptions,
            [prop]: event.target.checked
        });
    };
    return (<div className="option-checkbox">
        <input id={prop} type="checkbox"
            checked={gameOptions[prop]}
            onChange={readOnly ? undefined : handleOptionChange}
            readOnly={readOnly}
        />
        <label htmlFor={prop}>
            {getLabel('GameOptions', prop)}
            <Tooltip description={getLabel('GameOptionsTooltip', prop)} />
        </label>
    </div>)
};

function OptionNumber({ prop, max, gameOptions, setGameOptions, readOnly }: GameOptionProps & { prop: GameOptionsOf<number>, max?: number }) {
    const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length === 0) {
            setGameOptions({ ...gameOptions, [prop]: undefined });
        } else if (event.target.validity.valid) {
            const value = event.target.valueAsNumber;
            if (value >= 0 && (max === undefined || value <= max)) {
                setGameOptions({ ...gameOptions, [prop]: value });
            }
        }
    };

    return (<div className="option-number">
        <label htmlFor={prop}>
            {getLabel('GameOptions', prop)}
            <Tooltip description={getLabel('GameOptionsTooltip', prop)} />
        </label>
        <input id={prop} type="number"
            value={gameOptions[prop] ?? ''}
            pattern='[0-9]{0,5}'
            onChange={readOnly ? undefined : handleNumberChange}
            readOnly={readOnly}
        />
    </div>);
}

export default function GameOptionsEditor(props: GameOptionProps) {
    const [enableUnofficial, setEnableUnofficial] = useLocalStorage('enable_unofficial', boolConverter);

    const handleKeyDown = (ev: KeyboardEvent<HTMLDivElement>) => {
        if (ev.key === 'x') {
            setEnableUnofficial(value => !value);
        }
    };

    return (<div className="game-options-editor">
        <div className="expansion-checkboxes" tabIndex={0} onKeyDown={handleKeyDown}>
            <div className="expansions-header">{getLabel('GameOptions', 'expansions')}</div>
            <ExpansionCheckbox name='dodgecity' { ...props } />
            <ExpansionCheckbox name='goldrush' { ...props } />
            <ExpansionCheckbox name='armedanddangerous' { ...props } />
            <ExpansionCheckbox name='greattrainrobbery' { ...props } />
            <ExpansionCheckbox name='valleyofshadows' { ...props } />
            <ExpansionCheckbox name='highnoon' { ...props } />
            <ExpansionCheckbox name='fistfulofcards' { ...props } />
            <ExpansionCheckbox name='wildwestshow' { ...props } />
            <ExpansionCheckbox name='thebullet' { ...props } />
            <UnofficialExpansionCheckbox name='canyondiablo' enabled={enableUnofficial} { ...props } />
        </div>
        <OptionCheckbox prop='enable_ghost_cards' { ...props } />
        <OptionCheckbox prop='character_choice' { ...props } />
        <OptionCheckbox prop='quick_discard_all' { ...props } />
        <OptionNumber prop='num_bots' max={8} { ...props } />
        <OptionNumber prop='bot_play_timer' max={10000} { ...props } />
        <OptionNumber prop='scenario_deck_size' max={100} { ...props } />
        <OptionNumber prop='damage_timer' max={10000} { ...props } />
        <OptionNumber prop='escape_timer' max={10000} { ...props } />
        <OptionNumber prop='tumbleweed_timer' max={10000} { ...props } />
        <OptionNumber prop='game_seed' { ...props} />
    </div>);
}