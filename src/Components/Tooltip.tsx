import "./Style/Tooltip.css"

export interface TooltipProps {
    description: string;
}

export default function Tooltip({ description }: TooltipProps) {
    return <div className="tooltip">?
        <span className="tooltiptext">{description}</span>
    </div>;
}