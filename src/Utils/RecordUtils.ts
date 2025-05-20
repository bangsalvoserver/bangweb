export type UpdateFunction<T> = (value: T) => T;

export function editById<K extends keyof any, V>(values: Record<K, V>, key: K, mapper: UpdateFunction<V>): Record<K, V> {
    return {
        ...values,
        [key]: mapper(values[key])
    };
}

export function editByIds<K extends keyof any, V>(values: Record<K, V>, keys: K[], mapper: UpdateFunction<V>): Record<K, V> {
    let newValues = { ...values };
    for (const key of keys) {
        newValues[key] = mapper(newValues[key]);
    }
    return newValues;
}

export function removeById<K extends keyof any, V>(values: Record<K, V>, key: K): Record<K, V> {
    const { [key]: _, ...rest } = values;
    return rest as Record<K, V>;
}

export function removeByIds<K extends keyof any, V>(values: Record<K, V>, keys: K[]): Record<K, V> {
    return keys.reduce(removeById, values);
}
