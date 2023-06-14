import { Dispatch } from "react";
import getLabel from "../../Locale/GetLabel";
import GameStringComponent from "./GameStringComponent";
import { GameChannel } from "./Model/GameUpdateHandler";
import { GamePrompt, TargetSelector } from "./Model/TargetSelector";
import { handleSendGameAction } from "./Model/TargetSelectorManager";
import { SelectorUpdate } from "./Model/TargetSelectorReducer";
import "./Style/PromptView.css";
import Button from "../../Components/Button";

export interface PromptProps {
    prompt: GamePrompt | {};
    channel: GameChannel;
    selector: TargetSelector;
    selectorDispatch: Dispatch<SelectorUpdate>;
}

export default function PromptView({ prompt, channel, selector, selectorDispatch }: PromptProps) {
    if ('yesno' in prompt) {

        const handleYes = () => handleSendGameAction(channel, selector, true);
        const handleNo = () => selectorDispatch({ undoSelection: {} });

        return <div className="prompt-view">
            <div className="prompt-message">
                <p><GameStringComponent message={prompt.yesno} /></p>
            </div>
            <div className="prompt-buttons">
                <Button color='blue' onClick={handleYes}>{getLabel('ui', 'BUTTON_YES')}</Button>
                <Button color='red' onClick={handleNo}>{getLabel('ui', 'BUTTON_NO')}</Button>
            </div>
        </div>
    } else if ('playpickundo' in prompt) {
        const card = prompt.playpickundo;

        const handlePlay = () => selectorDispatch({ selectPlayingCard: card });
        const handlePick = () => selectorDispatch({ selectPickCard: card });
        const handleUndo = () => selectorDispatch({ undoSelection: {} });

        return <div className="prompt-view">
            <div className="prompt-message">
                <p><GameStringComponent message={{
                    format_str: 'PROMPT_PLAY_OR_PICK',
                    format_args:[
                        { card: {
                            name: card.cardData.name,
                            sign: card.cardData.sign
                        }}
                    ]
                }} /></p>
            </div>
            <div className="prompt-buttons">
                <Button color='blue' onClick={handlePlay}>{getLabel('ui', 'BUTTON_PLAY')}</Button>
                <Button color='blue' onClick={handlePick}>{getLabel('ui', 'BUTTON_PICK')}</Button>
                <Button color='red' onClick={handleUndo}>{getLabel('ui', 'BUTTON_UNDO')}</Button>
            </div>
        </div>
    } else {
        return null;
    }
}
