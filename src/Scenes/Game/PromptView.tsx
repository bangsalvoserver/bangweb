import { Dispatch } from "react";
import Button from "../../Components/Button";
import { getLabel, useLanguage } from "../../Locale/Registry";
import GameStringComponent from "./GameStringComponent";
import { GamePrompt } from "./Model/TargetSelector";
import { SelectorUpdate } from "./Model/TargetSelectorReducer";
import "./Style/PromptView.css";

export interface PromptProps {
    prompt: GamePrompt;
    selectorDispatch: Dispatch<SelectorUpdate>;
}

export default function PromptView({ prompt, selectorDispatch }: PromptProps) {
    const language = useLanguage();

    if (prompt.type === 'yesno') {
        const handleYes = () => selectorDispatch({ setPrompt: { ...prompt, response: true } });
        const handleNo = () => selectorDispatch({ undoSelection: {} });

        return <div className="prompt-view">
            <div className="prompt-message">
                <p><GameStringComponent message={prompt.message} /></p>
            </div>
            <div className="prompt-buttons">
                <Button color='blue' onClick={handleYes}>{getLabel(language, 'ui', 'BUTTON_YES')}</Button>
                <Button color='red' onClick={handleNo}>{getLabel(language, 'ui', 'BUTTON_NO')}</Button>
            </div>
        </div>;
    } else if (prompt.type === 'playpick') {
        const card = prompt.card;

        const message = {
            format_str: 'PROMPT_PLAY_OR_PICK',
            format_args: [
                {
                    card: {
                        name: card.cardData.name,
                        sign: card.cardData.sign
                    }
                }
            ]
        };

        const handlePlay = () => selectorDispatch({ selectPlayingCard: card });
        const handlePick = () => selectorDispatch({ addCardTarget: card });
        const handleUndo = () => selectorDispatch({ undoSelection: {} });

        return <div className="prompt-view">
            <div className="prompt-message">
                <p><GameStringComponent message={message} /></p>
            </div>
            <div className="prompt-buttons">
                <Button color='blue' onClick={handlePlay}>{getLabel(language, 'ui', 'BUTTON_PLAY')}</Button>
                <Button color='blue' onClick={handlePick}>{getLabel(language, 'ui', 'BUTTON_PICK')}</Button>
                <Button color='red' onClick={handleUndo}>{getLabel(language, 'ui', 'BUTTON_UNDO')}</Button>
            </div>
        </div>;
    } else {
        return null;
    }
}
