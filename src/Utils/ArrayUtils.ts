export function repeat<T>(arr: T[], n: number) {
    let ret = [];
    for (let i=0; i<n; ++i) {
        ret.push(...arr);
    }
    return ret;
}

export function maybeIndexOf<T>(arr: T[], value?: T, fromIndex?: number): number | undefined {
    if (value) {
        const index = arr.indexOf(value, fromIndex);
        if (index >= 0) return index;
    }
    return undefined;
}

export function rotate<T>(arr: T[], index: number): T[] {
    if (index <= 0) return arr;
    return arr.slice(index, arr.length).concat(arr.slice(0, index));
}