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

export function getDivRect(div: HTMLDivElement): Rect {
    const rect = div.getBoundingClientRect();
    return {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
        w: rect.width,
        h: rect.height
    };
}

export function getRectCenter(rect: Rect): Point {
    return {
        x: rect.x + rect.w / 2,
        y: rect.y + rect.h / 2
    }
};