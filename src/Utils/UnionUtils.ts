export type Empty = Record<string, never>;
export type KeysOfUnion<T> = T extends T ? keyof T: never;
export type Distribute<T> = { [K in keyof T]: { [K1 in K]: T[K] } }[keyof T];

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

type UnionDispatchFunction<T, RetType> = (value: T) => RetType;
type UnionDispatchMap<Update extends UnionUpdate, RetType> = {
    [K in Update as keyof K]: UnionDispatchFunction<K[keyof K], RetType>
};

export function matchUnion<Update extends UnionUpdate, RetType = unknown>(update: Update, functions: UnionDispatchMap<Update, RetType>) {
    const [updateType, updateValue] = Object.entries(update)[0] as [KeysOfUnion<Update>, unknown];
    const fn = functions[updateType as KeysOfUnion<Update>] as UnionDispatchFunction<unknown, RetType>;
    if (!fn) throw new Error("Invalid updateType: " + updateType);

    return fn(updateValue);
}

export function createUnionDispatch<Update extends UnionUpdate, RetType = void>(functions: UnionDispatchMap<Update, RetType>) {
    return (update: Update) => matchUnion(update, functions);
}
