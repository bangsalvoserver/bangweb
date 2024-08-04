export type KeysOfUnion<T> = T extends T ? keyof T: never;
export type ExtractKeys<T, U> = T extends T ? T[keyof T] extends U ? keyof T : never : never;
export type FilteredKeys<T, U> = { [P in keyof T]: T[P] extends U ? P : never }[keyof T];
export type SpreadUnion<T> = { [K in T as keyof K]: K[keyof K] };
export type ChangeField<T, K extends keyof T, U> = { [Key in keyof T]: Key extends K ? U : T[Key]; };

type UnionUpdate = Record<string, unknown>;

type UnionReducerFunction<State, T, RetType> = (this: State, value: T) => RetType;
type UnionReducerMap<State, Update extends UnionUpdate, RetType> = {
    [K in Update as keyof K]: UnionReducerFunction<State, K[keyof K], RetType>
};

export function createUnionReducer<State, Update extends UnionUpdate, RetType = State>(functions: UnionReducerMap<State, Update, RetType>) {
    return (state: State, update: Update) => {
        const [updateType, updateValue] = Object.entries(update)[0] as [KeysOfUnion<Update>, unknown];
        const fn = functions[updateType as KeysOfUnion<Update>] as UnionReducerFunction<State, unknown, RetType>;
        if (!fn) throw new Error("Invalid updateType: " + updateType);

        return fn.call(state, updateValue);
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