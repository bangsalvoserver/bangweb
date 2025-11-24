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

export function getDivRect(div: Element | null): Rect | null {
    if (div === null) return null;
    const rect = div.getBoundingClientRect();
    return {
        x: rect.left,
        y: rect.top,
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

export function getWindowRect(): Rect {
    return {
        x: 0,
        y: 0,
        w: window.innerWidth,
        h: window.innerHeight
    };
}

export function relativeToWindow(point: Point): Point {
    return {
        x: point.x + window.scrollX,
        y: point.y + window.scrollY
    };
}

export function shrinkRect(rect: Rect, padX: number, padY: number): Rect {
    return {
        x: rect.x + padX,
        y: rect.y + padY,
        w: rect.w - padX * 2,
        h: rect.h - padY * 2
    };
}

export function clampPoint(pt: Point, rect: Rect): Point {
  return {
    x: Math.max(rect.x, Math.min(rect.x + rect.w, pt.x)),
    y: Math.max(rect.y, Math.min(rect.y + rect.h, pt.y))
  };
}