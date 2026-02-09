import { getLabel, hasLabel, useLanguage } from "../Locale/Registry";
import "./Style/Tooltip.css";

export interface TooltipProps {
    group: string;
    name: string;
}

export default function Tooltip({ group, name }: TooltipProps) {
    const language = useLanguage();
    if (hasLabel(language, group, name)) {
        return <div className="tooltip">?
            <span className="tooltiptext">{getLabel(language, group, name)}</span>
        </div>
    }
}