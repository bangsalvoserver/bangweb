import { Dispatch } from "react";
import getLabel from "../../Locale/GetLabel";
import GameStringComponent from "./GameStringComponent";
import { GameChannel } from "./Model/GameUpdateHandler";
import { GamePrompt, TargetSelector } from "./Model/TargetSelector";
import { handleSendGameAction } from "./Model/TargetSelectorManager";
import { SelectorUpdate } from "./Model/TargetSelectorReducer";
import "./Style/PromptView.css";

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
                <button onClick={handleYes} className="
                    bg-blue-500
                    hover:bg-blue-600
                    text-white
                    font-bold
                    py-2
                    px-4
                    rounded-md
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    "
                >{getLabel('ui', 'BUTTON_YES')}</button>
                <button onClick={handleNo} className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    font-bold
                    py-2
                    px-4
                    rounded-md
                    focus:outline-none
                    focus:ring-2
                    focus:ring-red-500
                ">{getLabel('ui', 'BUTTON_NO')}</button>
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
                <button onClick={handlePlay} className="
                    bg-blue-500
                    hover:bg-blue-600
                    text-white
                    font-bold
                    py-2
                    px-4
                    rounded-md
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    "
                >{getLabel('ui', 'BUTTON_PLAY')}</button>
                <button onClick={handlePick} className="
                    bg-blue-500
                    hover:bg-blue-600
                    text-white
                    font-bold
                    py-2
                    px-4
                    rounded-md
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    "
                >{getLabel('ui', 'BUTTON_PICK')}</button>
                <button onClick={handleUndo} className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    font-bold
                    py-2
                    px-4
                    rounded-md
                    focus:outline-none
                    focus:ring-2
                    focus:ring-red-500
                ">{getLabel('ui', 'BUTTON_UNDO')}</button>
            </div>
        </div>
    } else {
        return null;
    }
}
