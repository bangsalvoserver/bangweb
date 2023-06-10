export function repeat<T>(arr: T[], n: number) {
    let ret = [];
    for (let i=0; i<n; ++i) {
        ret.push(...arr);
    }
    return ret;
}

export function group<Key, Value>(values: Value[], mapper: (value: Value) => Key): Map<Key, Value[]> {
    let map = new Map<Key, Value[]>();
    values.forEach(value => {
        const key = mapper(value);
        map.set(key, (map.get(key) ?? []).concat(value));
    });
    return map;
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

export function anyOf<T>(arr: T[], predicate: (value: T) => boolean): boolean {
    for (let i=0; i<arr.length; ++i) {
        if (predicate(arr[i])) {
            return true;
        }
    }
    return false;
}

export function noneOf<T>(arr: T[], predicate: (value: T) => boolean): boolean {
    for (let i=0; i<arr.length; ++i) {
        if (predicate(arr[i])) {
            return false;
        }
    }
    return true;
}