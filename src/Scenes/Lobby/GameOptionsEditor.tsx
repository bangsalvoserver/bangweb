import { ChangeEvent, ReactNode, useCallback } from "react";
import Collapsible from "../../Components/Collapsible";
import Tooltip from "../../Components/Tooltip";
import getLabel from "../../Locale/GetLabel";
import { ExpansionType } from "../Game/Model/CardEnums";
import { GameOptions } from "../Game/Model/GameUpdate";
import './Style/GameOptionsEditor.css';

export interface GameOptionProps {
    gameOptions: GameOptions;
    setGameOptions?: (gameOptions: GameOptions) => void;
}

type FilteredKeys<T, U> = { [P in keyof T]: T[P] extends U ? P : never }[keyof T];
type GameOptionsOf<T> = keyof { [Property in FilteredKeys<Required<GameOptions>, T>]: unknown };

interface ExpansionProps extends GameOptionProps {
    name: ExpansionType;
    include?: ExpansionType[];
    exclude?: ExpansionType[];
}

function ExpansionCheckbox({ name, gameOptions, setGameOptions, include, exclude }: ExpansionProps) {
    const readOnly = setGameOptions === undefined;
    const handleExpansionChange = readOnly ? undefined : (event: ChangeEvent<HTMLInputElement>) => {
        const oldValue = gameOptions.expansions.includes(name);
        const newValue = event.target.checked;
        if (oldValue !== newValue) {
            setGameOptions({
                ...gameOptions,
                expansions: newValue
                    ? gameOptions.expansions.filter(e => {
                        return (!include || include.includes(e))
                            && (!exclude || !exclude.includes(e));
                    }).concat(name)
                    : gameOptions.expansions.filter(e => e !== name)
            });
        }
    };

    return (<div className="option-checkbox">
        <input id={name} type="checkbox"
            checked={gameOptions.expansions.includes(name)}
            onChange={handleExpansionChange}
            readOnly={readOnly}
        />
        <label htmlFor={name}>{getLabel('ExpansionType', name)}</label>
        <Tooltip group='ExpansionTooltip' name={name} />
    </div>);
}

interface BoolGameOptionProps extends GameOptionProps {
    prop: GameOptionsOf<boolean>;
}

function OptionCheckbox({ prop, gameOptions, setGameOptions }: BoolGameOptionProps) {
    const readOnly = setGameOptions === undefined;
    const handleOptionChange = readOnly ? undefined : (event: ChangeEvent<HTMLInputElement>) => {
        setGameOptions({
            ...gameOptions,
            [prop]: event.target.checked
        });
    };
    return (<div className="option-checkbox">
        <input id={prop} type="checkbox"
            checked={gameOptions[prop]}
            onChange={handleOptionChange}
            readOnly={readOnly}
        />
        <label htmlFor={prop}>{getLabel('GameOptions', prop)}</label>
        <Tooltip group='GameOptionsTooltip' name={prop} />
    </div>)
};

interface IntGameOptionProps extends GameOptionProps {
    prop: GameOptionsOf<number>;
    min?: number;
    max?: number;
}

function OptionNumber({ prop, min, max, gameOptions, setGameOptions }: IntGameOptionProps) {
    const readOnly = setGameOptions === undefined;
    const handleNumberChange = readOnly ? undefined : (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length === 0) {
            setGameOptions({ ...gameOptions, [prop]: undefined });
        } else if (event.target.validity.valid) {
            const value = event.target.valueAsNumber;
            if (value >= 0 && (min === undefined || value >= min) && (max === undefined || value <= max)) {
                setGameOptions({ ...gameOptions, [prop]: value });
            }
        }
    };

    return (<div className="option-number">
        <div className="option-left-column">
            <label htmlFor={prop}>{getLabel('GameOptions', prop)}</label>
            <Tooltip group='GameOptionsTooltip' name={prop} />
        </div>
        <input id={prop} type="number"
            value={gameOptions[prop] ?? ''}
            pattern='[0-9]{0,5}'
            onChange={handleNumberChange}
            readOnly={readOnly}
        />
    </div>);
}

export default function GameOptionsEditor(props: GameOptionProps) {
    const ConditionalOnExpansion = useCallback(({ expansions, children }: { expansions: ExpansionType[], children: ReactNode }) => {
        if (expansions.some(value => props.gameOptions.expansions.includes(value))) {
            return children;
        } else {
            return null;
        }
    }, [props.gameOptions.expansions]);

    return (<div className="game-options-editor">
        <div className="game-options-group">
            <Collapsible label={getLabel('GameOptions', 'expansions')} storageKey="expand_expansions" defaultExpanded>
                <ExpansionCheckbox name='dodgecity' { ...props } />
                <ExpansionCheckbox name='wildwestshow_characters' { ...props } />
                <ExpansionCheckbox name='goldrush' { ...props } />
                <ExpansionCheckbox name='valleyofshadows' { ...props } exclude={['udolistinu']}/>
                <ExpansionCheckbox name='udolistinu' { ...props } exclude={['valleyofshadows']} />
                <ExpansionCheckbox name='armedanddangerous' { ...props } />
                <ExpansionCheckbox name='greattrainrobbery' { ...props } />
                <ExpansionCheckbox name='legends' { ...props } />
            </Collapsible>
            <Collapsible label={getLabel('GameOptions', 'variations')} storageKey="expand_variations" defaultExpanded>
                <ExpansionCheckbox name='ghost_cards' { ...props } />
                <ExpansionCheckbox name='highnoon' { ...props } />
                <ExpansionCheckbox name='fistfulofcards' { ...props } />
                <ExpansionCheckbox name='wildwestshow' { ...props } />
                <ExpansionCheckbox name='shadowgunslingers' { ...props } />
                <ExpansionCheckbox name='stickofdynamite' { ...props } />
            </Collapsible>
            <Collapsible label={getLabel('GameOptions', 'extras')} storageKey="expand_extras">
                <ExpansionCheckbox name='mostwanted' { ...props } />
                <ExpansionCheckbox name='canyondiablo' { ...props } />
            </Collapsible>
        </div>
        <div className="game-options-group">
            <Collapsible label={getLabel('ui', 'GAME_OPTIONS')} storageKey="expand_options">
                <OptionNumber prop='character_choice' min={1} max={3} { ...props } />
                <OptionNumber prop='num_bots' max={8} { ...props } />
                <OptionCheckbox prop='allow_bot_rejoin' { ...props } />
                <OptionCheckbox prop='only_base_characters' { ...props  } />
                <OptionCheckbox prop='quick_discard_all' { ...props } />
                <OptionCheckbox prop='auto_pick_predraw' { ...props } />
                <ConditionalOnExpansion expansions={['highnoon','fistfulofcards']}>
                    <OptionNumber prop='scenario_deck_size' max={100} { ...props } />
                </ConditionalOnExpansion>
                <OptionNumber prop='bot_play_timer' max={10000} { ...props } />
                <ConditionalOnExpansion expansions={['valleyofshadows','udolistinu','canyondiablo']}>
                    <OptionNumber prop='damage_timer' max={5000} { ...props } />
                </ConditionalOnExpansion>
                <ConditionalOnExpansion expansions={['valleyofshadows','udolistinu']}>
                    <OptionNumber prop='escape_timer' max={10000} { ...props } />
                </ConditionalOnExpansion>
                <OptionNumber prop='game_seed' { ...props} />
            </Collapsible>
        </div>
    </div>);
}