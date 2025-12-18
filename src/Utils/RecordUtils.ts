export type UpdateFunction<T> = (value: T) => T;

export type PartialRecord = Partial<Record<PropertyKey, unknown>>;

export function removeById<T extends PartialRecord, K extends keyof T>(values: T, key: K): T {
    const { [key]: _, ...rest } = values;
    return rest as T;
}

export function removeByIds<T extends PartialRecord, K extends keyof T>(values: T, keys: K[]): T {
    const result = { ...values };

    for (const key of keys) {
        delete result[key];
    }

    return result;
}

export function editById<T extends PartialRecord, K extends keyof T>(values: T, key: K, mapper: UpdateFunction<T[K]>): T {
    const newValue = mapper(values[key]);
    if (newValue === undefined) {
        return removeById(values, key);
    } else {
        return { ...values, [key]: newValue };
    }
}

export function editByIds<T extends PartialRecord, K extends keyof T>(values: T, keys: K[], mapper: UpdateFunction<T[K]>): T {
    const result = { ...values };

    for (const key of keys) {
        const newValue = mapper(result[key]);

        if (newValue === undefined) {
            delete result[key];
        } else {
            result[key] = newValue;
        }
    }

    return result;
}