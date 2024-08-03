export type KeysOfUnion<T> = T extends T ? keyof T: never;
export type ExtractKeys<T, U> = T extends T ? T[keyof T] extends U ? keyof T : never : never;
export type FilteredKeys<T, U> = { [P in keyof T]: T[P] extends U ? P : never }[keyof T];
export type SpreadUnion<T> = { [K in T as keyof K]: K[keyof K] };
export type UnionValue<T, K extends KeysOfUnion<T>> = SpreadUnion<T>[K];
export type ChangeField<T, K extends keyof T, U> = { [Key in keyof T]: Key extends K ? U : T[Key]; };

export function createUnionReducer<State, Update extends object, RetType = State>(functions: {
    [K in Update as keyof K]: (this: State, value: K[keyof K]) => RetType;
}) {
    return (state: State, update: Update) => {
        const [updateType, updateValue] = Object.entries(update)[0];
        if (!(updateType in functions)) throw new Error("Invalid updateType: " + updateType);

        const fn = functions[updateType as keyof typeof functions];
        return (fn as (this: State, update: unknown) => RetType).call(state, updateValue);
    };
}

export function createUnionDispatch<Update extends Object>(functions: {
    [K in Update as keyof K]: (value: K[keyof K]) => void;
}) {
    return (update: Update) => {
        const [updateType, updateValue] = Object.entries(update)[0];
        if (!(updateType in functions)) throw new Error("Invalid updateType: " + updateType);

        const fn = functions[updateType as keyof typeof functions];
        (fn as (update: unknown) => void)(updateValue);
    };
}