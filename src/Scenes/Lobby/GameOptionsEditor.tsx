import { ChangeEvent, ReactNode, useCallback } from "react";
import Collapsible from "../../Components/Collapsible";
import Tooltip from "../../Components/Tooltip";
import getLabel from "../../Locale/GetLabel";
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

export default function GameOptionsEditor({ gameOptions, setGameOptions }: GameOptionProps) {
    const ExpansionCheckbox = useCallback(({ name, include, exclude }: { name: ExpansionType, include?: ExpansionType[], exclude?: ExpansionType[] }) => {
        const readOnly = setGameOptions === undefined;
        const handleExpansionChange = readOnly ? undefined : (event: ChangeEvent<HTMLInputElement>) => {
            const oldValue = gameOptions.expansions?.includes(name);
            const newValue = event.target.checked;
            if (oldValue !== newValue) {
                setGameOptions({
                    expansions: newValue
                        ? gameOptions.expansions?.filter(e => {
                            return (!include || include.includes(e))
                                && (!exclude || !exclude.includes(e));
                        }).concat(name)
                        : gameOptions.expansions?.filter(e => e !== name)
                });
            }
        };

        return (<div className="option-row">
            <input id={name} type="checkbox"
                checked={gameOptions.expansions?.includes(name)}
                onChange={handleExpansionChange}
                readOnly={readOnly}
            />
            <label htmlFor={name}>{getLabel('ExpansionType', name)}</label>
            <Tooltip group='ExpansionTooltip' name={name} />
        </div>);
    }, [gameOptions.expansions, setGameOptions]);

    const ConditionalOnExpansion = useCallback(({ expansions, children }: { expansions: ExpansionType[], children: ReactNode }) => {
        if (expansions.some(value => gameOptions.expansions?.includes(value))) {
            return children;
        } else {
            return null;
        }
    }, [gameOptions.expansions]);

    const numberSetter = useCallback((prop: GameOptionsOf<number>['prop'], min?: number, max?: number) => {
        if (setGameOptions) return (event: ChangeEvent<HTMLInputElement>) => {
            if (event.target.value.length === 0) {
                setGameOptions({ [prop]: undefined });
            } else if (event.target.validity.valid) {
                const newValue = event.target.valueAsNumber;
                if (newValue >= 0 && (min === undefined || newValue >= min) && (max === undefined || newValue <= max)) {
                    setGameOptions({ [prop]: newValue });
                }
            }
        };
    }, [setGameOptions]);

    const OptionNumber = useCallback(({ prop, value, min, max }: GameOptionsOf<number> & { min?: number, max?: number }) => {
        const handleNumberChange = numberSetter(prop, min, max);
        return (<div className="option-row">
            <div className="option-left-column">
                <label htmlFor={prop}>{getLabel('GameOptions', prop)}</label>
                <Tooltip group='GameOptionsTooltip' name={prop} />
            </div>
            <div className="option-right-column">
                <input id={prop} type="number"
                    value={value ?? ''}
                    pattern='[0-9]{0,5}'
                    onChange={handleNumberChange}
                    readOnly={handleNumberChange === undefined}
                />
            </div>
        </div>);
    }, [numberSetter]);

    const OptionSlider = useCallback(({ prop, value, min, max, step }: GameOptionsOf<number> & { min?: number, max?: number, step?: number }) => {
        const handleNumberChange = numberSetter(prop, min, max);
        return (<div className="option-row">
            <div className="option-left-column">
                <label htmlFor={prop}>{getLabel('GameOptions', prop)}</label>
                <Tooltip group='GameOptionsTooltip' name={prop} />
            </div>
            <div className="option-right-column">
                <input id={prop} type="range"
                    min={min} max={max} step={step}
                    value={value}
                    onChange={handleNumberChange}
                    readOnly={handleNumberChange === undefined}
                />
                <input id={prop} type="number"
                    value={value}
                    pattern='[0-9]{0,5}'
                    onChange={handleNumberChange}
                    readOnly={handleNumberChange === undefined}
                />
            </div>
        </div>);
    }, [numberSetter]);

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
            <label htmlFor={prop}>{getLabel('GameOptions', prop)}</label>
            <Tooltip group='GameOptionsTooltip' name={prop} />
        </div>)
    }, [setGameOptions]);

    const getOption = <T,>(prop: GameOptionsOf<T>['prop']) => {
        let value: T | undefined;
        if (prop in gameOptions) {
            value = gameOptions[prop] as T;
        }
        return {prop, value};
    };

    return (<div className="game-options-editor">
        <div className="game-options-group">
            <Collapsible label={getLabel('GameOptions', 'expansions')} storageKey="expand_expansions" defaultExpanded>
                <ExpansionCheckbox name='dodgecity' />
                <ExpansionCheckbox name='wildwestshow_characters' />
                <ExpansionCheckbox name='goldrush' />
                <ExpansionCheckbox name='valleyofshadows' exclude={['udolistinu']}/>
                <ExpansionCheckbox name='udolistinu' exclude={['valleyofshadows']} />
                <ExpansionCheckbox name='armedanddangerous' />
                <ExpansionCheckbox name='greattrainrobbery' />
                <ExpansionCheckbox name='legends' />
            </Collapsible>
            <Collapsible label={getLabel('GameOptions', 'variations')} storageKey="expand_variations" defaultExpanded>
                <ExpansionCheckbox name='ghost_cards' />
                <ExpansionCheckbox name='highnoon' />
                <ExpansionCheckbox name='fistfulofcards' />
                <ExpansionCheckbox name='wildwestshow' />
                <ExpansionCheckbox name='shadowgunslingers' />
                <ExpansionCheckbox name='stickofdynamite' />
            </Collapsible>
            <Collapsible label={getLabel('GameOptions', 'extras')} storageKey="expand_extras">
                <ExpansionCheckbox name='mostwanted' />
                <ExpansionCheckbox name='canyondiablo' />
                <ExpansionCheckbox name='crazy_greygory' />
            </Collapsible>
        </div>
        <div className="game-options-group">
            <Collapsible label={getLabel('ui', 'GAME_OPTIONS')} storageKey="expand_options">
                <OptionSlider {...getOption('character_choice')} min={1} max={3} />
                <OptionSlider {...getOption('max_players')} min={3} max={8} />
                <OptionCheckbox {...getOption('add_bots')} />
                <OptionCheckbox {...getOption('allow_bot_rejoin')} />
                <OptionCheckbox {...getOption('only_base_characters')} />
                <OptionCheckbox {...getOption('quick_discard_all')} />
                <OptionCheckbox {...getOption('auto_pick_predraw')} />
                <ConditionalOnExpansion expansions={['highnoon','fistfulofcards']}>
                    <OptionSlider {...getOption('scenario_deck_size')} max={30} />
                </ConditionalOnExpansion>
                <OptionSlider {...getOption('auto_resolve_timer')} max={5000} step={50} />
                <OptionSlider {...getOption('bot_play_timer')} max={10000} step={50} />
                <ConditionalOnExpansion expansions={['valleyofshadows','udolistinu','canyondiablo']}>
                    <OptionSlider {...getOption('damage_timer')} max={5000} step={50} />
                </ConditionalOnExpansion>
                <ConditionalOnExpansion expansions={['valleyofshadows','udolistinu']}>
                    <OptionSlider {...getOption('escape_timer')} max={10000} step={50} />
                </ConditionalOnExpansion>
                <OptionNumber {...getOption('game_seed')} />
            </Collapsible>
        </div>
    </div>);
}