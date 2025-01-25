import getLabel, { hasLabel } from "../Locale/GetLabel";
import "./Style/Tooltip.css"

export interface TooltipProps {
    group: string;
    name: string;
}

export default function Tooltip({ group, name }: TooltipProps) {
    if (hasLabel(group, name)) {
        return <div className="tooltip">?
            <span className="tooltiptext">{getLabel(group, name)}</span>
        </div>
    }
}