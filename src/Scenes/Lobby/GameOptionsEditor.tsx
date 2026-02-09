import { ChangeEvent, ReactNode, useCallback } from "react";
import Collapsible from "../../Components/Collapsible";
import Tooltip from "../../Components/Tooltip";
import { getLabel, useLanguage } from "../../Locale/Registry";
import { ExpansionType } from "../Game/Model/CardEnums";
import { GameOptions } from "../Game/Model/GameUpdate";
import { SetGameOptions } from "./Lobby";
import './Style/GameOptionsEditor.css';

export interface GameOptionProps {
    gameOptions: GameOptions;
    setGameOptions?: SetGameOptions;
}

type GameOptionsOf<T> = {
    [K in keyof Required<GameOptions>]: Required<GameOptions>[K] extends T ? { prop: K, value?: T } : never;
}[keyof GameOptions];

interface ExpansionProps {
    name: ExpansionType;
    onSelect?: (expansions: Set<ExpansionType>) => void;
    onDeselect?: (expansions: Set<ExpansionType>) => void;
}

export default function GameOptionsEditor({ gameOptions, setGameOptions }: GameOptionProps) {
    const language = useLanguage();

    const ExpansionCheckbox = useCallback(({ name, onSelect, onDeselect }: ExpansionProps) => {
        const readOnly = setGameOptions === undefined;
        const handleExpansionChange = readOnly ? undefined : (event: ChangeEvent<HTMLInputElement>) => {
            const oldValue = gameOptions.expansions?.includes(name);
            const newValue = event.target.checked;
            if (oldValue !== newValue) {
                const expansions = new Set(gameOptions.expansions ?? []);
                if (newValue) {
                    expansions.add(name);
                    if (onSelect) onSelect(expansions);
                } else {
                    expansions.delete(name);
                    if (onDeselect) onDeselect(expansions);
                }
                setGameOptions({ expansions: [...expansions] });
            }
        };

        return (<div className="option-row">
            <input id={name} type="checkbox"
                checked={gameOptions.expansions?.includes(name)}
                onChange={handleExpansionChange}
                readOnly={readOnly}
            />
            <label htmlFor={name}>{getLabel(language, 'ExpansionType', name)}</label>
            <Tooltip group='ExpansionTooltip' name={name} />
        </div>);
    }, [language, gameOptions.expansions, setGameOptions]);

    const ConditionalOnExpansion = useCallback(({ expansions, children }: { expansions: ExpansionType[], children: ReactNode }) => {
        if (expansions.some(value => gameOptions.expansions?.includes(value))) {
            return children;
        } else {
            return null;
        }
    }, [gameOptions.expansions]);

    type NumberTransform = (value: number) => number;

    const numberSetter = useCallback((prop: GameOptionsOf<number>['prop'], min?: number, max?: number, transform?: NumberTransform) => {
        if (setGameOptions) return (event: ChangeEvent<HTMLInputElement>) => {
            if (event.target.value.length === 0) {
                setGameOptions({ [prop]: undefined });
            } else if (event.target.validity.valid) {
                let newValue = event.target.valueAsNumber;
                if (newValue >= 0 && (min === undefined || newValue >= min) && (max === undefined || newValue <= max)) {
                    if (transform) newValue = transform(newValue);
                    setGameOptions({ [prop]: newValue });
                }
            }
        };
    }, [setGameOptions]);

    const OptionNumber = useCallback(({ prop, value, min, max, withSlider, step, transform, reverseTransform }: GameOptionsOf<number> & {
        min?: number;
        max?: number;
        withSlider?: boolean;
        step?: number;
        transform?: NumberTransform;
        reverseTransform?: NumberTransform;
    }) => {
        const handleNumberChange = numberSetter(prop, min, max, transform);
        if (value !== undefined && reverseTransform) value = reverseTransform(value);
        return (<div className="option-row">
            <div className="option-left-column">
                <label htmlFor={prop}>{getLabel(language, 'GameOptions', prop)}</label>
                <Tooltip group='GameOptionsTooltip' name={prop} />
            </div>
            <div className="option-right-column">
                {withSlider && <input id={prop + '_range'} type="range"
                    min={min} max={max} step={step}
                    value={value}
                    onChange={handleNumberChange}
                    readOnly={handleNumberChange === undefined}
                />}
                <input id={prop} type="number"
                    value={value ?? ''}
                    pattern='[0-9]{0,5}'
                    onChange={handleNumberChange}
                    readOnly={handleNumberChange === undefined}
                />
            </div>
        </div>);
    }, [language, numberSetter]);

    const OptionCheckbox = useCallback(({ prop, value }: GameOptionsOf<boolean>) => {
        const readOnly = setGameOptions === undefined;
        const handleOptionChange = readOnly ? undefined : (event: ChangeEvent<HTMLInputElement>) => {
            setGameOptions({ [prop]: event.target.checked });
        };
        return (<div className="option-row">
            <input id={prop} type="checkbox"
                checked={value}
                onChange={handleOptionChange}
                readOnly={readOnly}
            />
            <label htmlFor={prop}>{getLabel(language, 'GameOptions', prop)}</label>
            <Tooltip group='GameOptionsTooltip' name={prop} />
        </div>)
    }, [language, setGameOptions]);

    const getOption = <T,>(prop: GameOptionsOf<T>['prop']) => {
        let value: T | undefined;
        if (prop in gameOptions) {
            value = gameOptions[prop] as T;
        }
        return {prop, value} as GameOptionsOf<T>;
    };

    const maxCoefficient = 4.0;

    const transformVelocity = (value: number) => {
        if (value < 50) {
            // 0-50 maps to max-1 linearly
            return ((1.0 - maxCoefficient) / 50.0) * value + maxCoefficient;
        } else {
            // 50-100 maps to 1-0 linearly
            return -0.02 * value + 2.0;
        }
    };

    const reverseTransformVelocity = (coefficient: number) => {
        if (coefficient < 1) {
            // 0-1 maps to 100-50 linearly
            return Math.round(-50.0 * coefficient + 100.0);
        } else {
            // 1-max maps to 50-0 linearly
            return Math.round((50.0 * (coefficient - maxCoefficient)) / (1.0 - maxCoefficient));
        }
    };

    return (<div className="game-options-editor">
        <div className="game-options-group">
            <Collapsible label={getLabel(language, 'GameOptions', 'expansions')} storageKey="expand_expansions" defaultExpanded>
                <ExpansionCheckbox name='dodgecity' />
                <ExpansionCheckbox name='wildwestshow_characters' />
                <ExpansionCheckbox name='goldrush' />
                <ExpansionCheckbox name='valleyofshadows' onSelect={e => e.delete('udolistinu')} />
                <ExpansionCheckbox name='udolistinu' onSelect={e => e.delete('valleyofshadows')} />
                <ExpansionCheckbox name='armedanddangerous' />
                <ExpansionCheckbox name='greattrainrobbery' />
                <ExpansionCheckbox name='legends' onSelect={e => e.add('legends_basemod')} />
                <ExpansionCheckbox name='legends_basemod' onDeselect={e => e.delete('legends')} />
            </Collapsible>
            <Collapsible label={getLabel(language, 'GameOptions', 'variations')} storageKey="expand_variations" defaultExpanded>
                <ExpansionCheckbox name='ghost_cards' />
                <ExpansionCheckbox name='highnoon' />
                <ExpansionCheckbox name='fistfulofcards' />
                <ExpansionCheckbox name='wildwestshow' />
                <ExpansionCheckbox name='shadowgunslingers' />
                <ExpansionCheckbox name='stickofdynamite' />
            </Collapsible>
            <Collapsible label={getLabel(language, 'GameOptions', 'extras')} storageKey="expand_extras">
                <ExpansionCheckbox name='mostwanted' />
                <ExpansionCheckbox name='canyondiablo' />
                <ExpansionCheckbox name='crazy_greygory' />
            </Collapsible>
        </div>
        <div className="game-options-group">
            <Collapsible label={getLabel(language, 'ui', 'GAME_OPTIONS')} storageKey="expand_options">
                <OptionNumber {...getOption('character_choice')} min={1} max={3} withSlider />
                <OptionNumber {...getOption('max_players')} min={3} max={8} withSlider />
                <OptionCheckbox {...getOption('add_bots')} />
                <OptionCheckbox {...getOption('allow_bot_rejoin')} />
                <OptionCheckbox {...getOption('only_base_characters')} />
                <OptionCheckbox {...getOption('quick_discard_all')} />
                <OptionCheckbox {...getOption('auto_pick_predraw')} />
                <ConditionalOnExpansion expansions={['highnoon','fistfulofcards']}>
                    <OptionNumber {...getOption('scenario_deck_size')} max={30} withSlider />
                </ConditionalOnExpansion>
                <OptionNumber {...getOption('duration_coefficient')} min={0} max={100} withSlider transform={transformVelocity} reverseTransform={reverseTransformVelocity} />
                <OptionNumber {...getOption('auto_resolve_timer')} max={5000} step={50} withSlider />
                <OptionNumber {...getOption('bot_play_timer')} max={10000} step={50} withSlider />
                <ConditionalOnExpansion expansions={['valleyofshadows','udolistinu','canyondiablo']}>
                    <OptionNumber {...getOption('damage_timer')} max={5000} step={50} withSlider />
                </ConditionalOnExpansion>
                <ConditionalOnExpansion expansions={['valleyofshadows','udolistinu']}>
                    <OptionNumber {...getOption('escape_timer')} max={10000} step={50} withSlider />
                </ConditionalOnExpansion>
                <OptionNumber {...getOption('game_seed')} />
            </Collapsible>
        </div>
    </div>);
}