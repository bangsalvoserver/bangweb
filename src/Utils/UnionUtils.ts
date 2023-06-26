export type KeysOfUnion<T> = T extends T ? keyof T: never;
export type ExtractKeys<T, U> = T extends T ? T[keyof T] extends U ? keyof T : never : never;
export type FilteredKeys<T, U> = { [P in keyof T]: T[P] extends U ? P : never }[keyof T];

export type SpreadUnion<T> = {
    [K in T as keyof K]: K[keyof K]
};

export function createUnionReducer<State, Update extends object>(functions: {
    [K in Update as keyof K]?: (this: State, value: K[keyof K]) => State;
}) {
    return (state: State, update: Update) => {
        const [updateType, updateValue] = Object.entries(update)[0];
        if (updateType in functions) {
            const fn = functions[updateType as keyof typeof functions];
            return (fn as (this: State, update: unknown) => State).call(state, updateValue);
        } else {
            return state;
        }
    };
}

export function createUnionFunction<This, Update extends object>(functions: {
    [K in Update as keyof K]?: (this: This, value: K[keyof K]) => void;
}) {
    return function (this: This, update: Update) {
        const [updateType, updateValue] = Object.entries(update)[0];
        if (updateType in functions) {
            const fn = functions[updateType as keyof typeof functions];
            (fn as (this: This, update: unknown) => void).call(this, updateValue);
        }
    };
}

export type ChangeField<T, K extends keyof T, U> = {
    [Key in keyof T]: Key extends K ? U : T[Key];
};