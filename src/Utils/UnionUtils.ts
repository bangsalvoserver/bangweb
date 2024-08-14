export type KeysOfUnion<T> = T extends T ? keyof T: never;
export type ExtractKeys<T, U> = T extends T ? T[keyof T] extends U ? keyof T : never : never;
export type FilteredKeys<T, U> = { [P in keyof T]: T[P] extends U ? P : never }[keyof T];
export type SpreadUnion<T> = { [K in T as keyof K]: K[keyof K] };

type UnionUpdate = Record<string, unknown>;

type UnionReducerFunction<State, T> = (this: State, value: T) => State;
type UnionReducerMap<State, Update extends UnionUpdate> = {
    [K in Update as keyof K]: UnionReducerFunction<State, K[keyof K]>
};

export function createUnionReducer<State, Update extends UnionUpdate>(functions: UnionReducerMap<State, Update>) {
    return (state: State, update: Update) => {
        const [updateType, updateValue] = Object.entries(update)[0] as [KeysOfUnion<Update>, unknown];
        const fn = functions[updateType as KeysOfUnion<Update>] as UnionReducerFunction<State, unknown>;
        if (!fn) throw new Error("Invalid updateType: " + updateType);

        return fn.call(state, updateValue);
    };
}

type ContextUnionReducerFunction<State, Context, T> = (this: State, context: Context, value: T) => State;
type ContextUnionReducerMap<State, Context, Update extends UnionUpdate> = {
    [K in Update as keyof K]: ContextUnionReducerFunction<State, Context, K[keyof K]>
};

export function createContextUnionReducer<State, Context, Update extends UnionUpdate>(functions: ContextUnionReducerMap<State, Context, Update>) {
    return (state: State, context: Context, update: Update) => {
        const [updateType, updateValue] = Object.entries(update)[0] as [KeysOfUnion<Update>, unknown];
        const fn = functions[updateType as KeysOfUnion<Update>] as ContextUnionReducerFunction<State, Context, unknown>;
        if (!fn) throw new Error("Invalid updateType: " + updateType);

        return fn.call(state, context, updateValue);
    };
}

type UnionDispatchFunction<T> = (value: T) => void;
type UnionDispatchMap<Update extends UnionUpdate> = {
    [K in Update as keyof K]: UnionDispatchFunction<K[keyof K]>
};

export function createUnionDispatch<Update extends UnionUpdate>(functions: UnionDispatchMap<Update>) {
    return (update: Update) => {
        const [updateType, updateValue] = Object.entries(update)[0] as [KeysOfUnion<Update>, unknown];
        const fn = functions[updateType as KeysOfUnion<Update>] as UnionDispatchFunction<unknown>;
        if (!fn) throw new Error("Invalid updateType: " + updateType);

        fn(updateValue);
    };
}