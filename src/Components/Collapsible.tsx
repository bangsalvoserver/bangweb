import { ReactNode } from "react";
import { boolConverter, useLocalStorage } from "../Utils/UseLocalStorage";
import "./Style/Collapsible.css"

export interface CollapsibleProps {
    label: ReactNode;
    children: ReactNode;
    storageKey: string;
    defaultExpanded?: boolean;
}

export default function Collapsible({ label, children, storageKey, defaultExpanded }: CollapsibleProps) {
    const [expanded, setExpanded] = useLocalStorage(storageKey, boolConverter, defaultExpanded);
    const toggleExpanded = () => setExpanded(value => !value);

    return <div className="collapsible">
        <div className="collapsible-header" onClick={toggleExpanded}>{expanded ? '+' : '-'} {label}</div>
        <div className={expanded ? "collapsible-visible" : "collapsible-collapsed"}>{children}</div>
    </div>;
}