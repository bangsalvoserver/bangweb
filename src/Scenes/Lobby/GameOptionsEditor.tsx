import { ChangeEvent, ReactNode, useCallback } from "react";
import Tooltip from "../../Components/Tooltip";
import getLabel from "../../Locale/GetLabel";
import { boolConverter, useLocalStorage } from "../../Utils/UseLocalStorage";
import { ExpansionType } from "../Game/Model/CardEnums";
import { GameOptions } from "../Game/Model/GameUpdate";
import './Style/GameOptionsEditor.css';

export type AddExpansion = (value: ExpansionType, expansions: ExpansionType[]) => ExpansionType[];

export interface GameOptionProps {
    gameOptions: GameOptions;
    setGameOptions: (gameOptions: GameOptions) => void;
    readOnly: boolean;
}

type FilteredKeys<T, U> = { [P in keyof T]: T[P] extends U ? P : never }[keyof T];
type GameOptionsOf<T> = keyof { [Property in FilteredKeys<Required<GameOptions>, T>]: unknown };

interface ExpansionProps extends GameOptionProps {
    name: ExpansionType;
    addExpansion: AddExpansion;
}

function addExpansionWithout(...without: ExpansionType[]): AddExpansion {
    return (value, expansions) => expansions.filter(e => !without.includes(e)).concat(value);
}

function ExpansionCheckbox({ name, gameOptions, setGameOptions, readOnly, addExpansion }: ExpansionProps) {
    const handleExpansionChange = (event: ChangeEvent<HTMLInputElement>) => {
        const oldValue = gameOptions.expansions.includes(name);
        const newValue = event.target.checked;
        if (oldValue !== newValue) {
            setGameOptions({
                ...gameOptions,
                expansions: newValue
                    ? addExpansion(name, gameOptions.expansions)
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

interface BoolGameOptionProps extends GameOptionProps {
    prop: GameOptionsOf<boolean>;
}

function OptionCheckbox({ prop, gameOptions, setGameOptions, readOnly }: BoolGameOptionProps) {
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

interface IntGameOptionProps extends GameOptionProps {
    prop: GameOptionsOf<number>;
    max?: number;
}

function OptionNumber({ prop, max, gameOptions, setGameOptions, readOnly }: IntGameOptionProps) {
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
    const [expandOptions, setExpandOptions] = useLocalStorage('expand_options', boolConverter);

    const ConditionalOnExpansion = useCallback(({ expansions, children }: { expansions: ExpansionType[], children: ReactNode }) => {
        if (expansions.some(value => props.gameOptions.expansions.includes(value))) {
            return children;
        } else {
            return null;
        }
    }, [props.gameOptions.expansions]);

    return (<div className="game-options-editor">
        <div className="game-options-group">
            <div className="game-options-group-header">{getLabel('GameOptions', 'expansions')}</div>
            <ExpansionCheckbox name='dodgecity' addExpansion={addExpansionWithout('legends')} { ...props } />
            <ExpansionCheckbox name='goldrush' addExpansion={addExpansionWithout('legends')} { ...props } />
            <ExpansionCheckbox name='armedanddangerous' addExpansion={addExpansionWithout('legends')} { ...props } />
            <ExpansionCheckbox name='greattrainrobbery' addExpansion={addExpansionWithout('legends')} { ...props } />
            <ExpansionCheckbox name='valleyofshadows' addExpansion={addExpansionWithout('legends', 'udolistinu')} { ...props } />
            <ExpansionCheckbox name='udolistinu' addExpansion={addExpansionWithout('legends', 'valleyofshadows')} { ...props } />
            <ExpansionCheckbox name='highnoon' addExpansion={addExpansionWithout('legends')} { ...props } />
            <ExpansionCheckbox name='fistfulofcards' addExpansion={addExpansionWithout('legends')} { ...props } />
            <ExpansionCheckbox name='wildwestshow' addExpansion={addExpansionWithout('legends')} { ...props } />
            <ExpansionCheckbox name='legends' addExpansion={value => [value]} { ...props } />
            <ExpansionCheckbox name='thebullet' addExpansion={addExpansionWithout('legends')} { ...props } />
            <ExpansionCheckbox name='canyondiablo' addExpansion={addExpansionWithout('legends')} { ...props } />
        </div>
        <div className="game-options-group">
            <div className="game-options-group-header cursor-pointer" onClick={() => setExpandOptions(value => !value)}>
                {expandOptions ? '+' : '-'} {getLabel('ui', 'GAME_OPTIONS')}
            </div>
            <div className={expandOptions ? "game-options-visible" : "game-options-collapsed"}>
                <ConditionalOnExpansion expansions={['greattrainrobbery','valleyofshadows','udolistinu','highnoon','fistfulofcards','wildwestshow']}>
                    <OptionCheckbox prop='enable_ghost_cards' { ...props } />
                </ConditionalOnExpansion>
                <OptionCheckbox prop='character_choice' { ...props } />
                <OptionCheckbox prop='quick_discard_all' { ...props } />
                <OptionCheckbox prop='auto_pick_predraw' { ...props } />
                <OptionCheckbox prop='allow_bot_rejoin' { ...props } />
                <OptionNumber prop='num_bots' max={8} { ...props } />
                <OptionNumber prop='bot_play_timer' max={10000} { ...props } />
                <ConditionalOnExpansion expansions={['highnoon','fistfulofcards']}>
                    <OptionNumber prop='scenario_deck_size' max={100} { ...props } />
                </ConditionalOnExpansion>
                <ConditionalOnExpansion expansions={['valleyofshadows','udolistinu','canyondiablo']}>
                    <OptionNumber prop='damage_timer' max={5000} { ...props } />
                </ConditionalOnExpansion>
                <ConditionalOnExpansion expansions={['valleyofshadows','udolistinu']}>
                    <OptionNumber prop='escape_timer' max={10000} { ...props } />
                </ConditionalOnExpansion>
                <ConditionalOnExpansion expansions={['armedanddangerous']}>
                    <OptionNumber prop='tumbleweed_timer' max={10000} { ...props } />
                </ConditionalOnExpansion>
                <OptionNumber prop='game_seed' { ...props} />
            </div>
        </div>
    </div>);
}