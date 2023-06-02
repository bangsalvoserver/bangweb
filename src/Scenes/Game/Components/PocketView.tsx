import "./PocketView.css"
import { MutableRefObject, forwardRef, useImperativeHandle, useRef } from "react";
import { CardId } from "../../../Messages/GameUpdate";
import { GameTable, getCard } from "../GameTable";
import CardView from "./CardView";
import { PocketType, TablePocketType } from "../../../Messages/CardEnums";

export interface Rect {
  x: number,
  y: number,
  w: number,
  h: number
};

export interface Point {
    x: number,
    y: number
}

export function getRectCenter(rect: Rect): Point {
    return {
        x: rect.x + rect.w / 2,
        y: rect.y + rect.h / 2
    }
};

export interface PocketPosition {
    getRect: () => Rect;
}

export interface PocketProps {
    table: GameTable;
    cards: CardId[];
    className?: string;
}

export type PocketPositionRef = MutableRefObject<PocketPosition>;

export type PocketPositionMap = Partial<Record<PocketType, PocketPositionRef>>;

const PocketView = forwardRef<PocketPosition, PocketProps>(({ table, cards, className }, ref) => {
    const pocketRef = useRef() as MutableRefObject<HTMLDivElement>;

    useImperativeHandle(ref, () => ({
        getRect: () => {
            const rect = pocketRef.current.getBoundingClientRect();
            return {
                x: rect.left + window.scrollX,
                y: rect.top + window.scrollY,
                w: rect.width,
                h: rect.height
            };
        }
    }));

    return <div ref={pocketRef} className={`pocket-view ${className ?? ''}`}>{ cards.map(id => <CardView key={id} card={getCard(table, id)} /> )}</div>;
});

export default PocketView;