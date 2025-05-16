export type UpdateFunction<T> = (value: T) => T;

export function editById<K extends keyof any, V>(values: Record<K, V>, keys: K | K[], mapper: UpdateFunction<V>): Record<K, V> {
    let newRecord: Record<K, V> = { ...values };
    if (Array.isArray(keys)) {
        for (const key of keys) {
            newRecord[key] = mapper(values[key]);
        }
    } else {
        newRecord[keys] = mapper(values[keys]);
    }
    return newRecord;
}

export function removeById<K extends keyof any, V>(values: Record<K, V>, keys: K | K[]): Record<K, V> {
    if (Array.isArray(keys)) {
        let removed = values;
        for (const key of keys) {
            const { [key]: _, ...rest } = removed;
            removed = rest as Record<K, V>;
        }
        return removed;
    } else {
        const { [keys]: _, ...rest } = values;
        return rest as Record<K, V>;
    }
}

