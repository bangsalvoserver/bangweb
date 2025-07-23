export type UpdateFunction<T> = (value: T) => T;

export type PartialRecord = { [k in keyof any]?: unknown };

export function removeById<T extends PartialRecord>(values: T, key: keyof T): T {
    const { [key]: _, ...rest } = values;
    return rest as T;
}

export function removeByIds<T extends PartialRecord>(values: T, keys: (keyof T)[]): T {
    return keys.reduce(removeById, values);
}

export function editById<T extends PartialRecord>(values: T, key: keyof T, mapper: UpdateFunction<T[keyof T]>): T {
    const newValue = mapper(values[key]);
    if (newValue === undefined) {
        return removeById(values, key);
    } else {
        return { ...values, [key]: newValue };
    }
}

export function editByIds<T extends PartialRecord>(values: T, keys: (keyof T)[], mapper: UpdateFunction<T[keyof T]>): T {
    return keys.reduce((curValues, key) => editById(curValues, key, mapper), values);
}