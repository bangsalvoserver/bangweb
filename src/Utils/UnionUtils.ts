export function createUnionReducer<State, Update extends object>(functions: {
    [K in Update as keyof K]?: (this: State, value: K[keyof K]) => State;
}) {
    return (state: State, update: Update) => {
        const updateType = Object.keys(update)[0] as keyof typeof functions;
        if (updateType in functions) {
            const updateValue = update[updateType];
            const fn = functions[updateType] as (this: State, update: any) => State;
            return fn.call(state, updateValue);
        } else {
            return state;
        }
    };
}

export function createUnionFunction<This, Update extends object>(functions: {
    [K in Update as keyof K]?: (this: This, value: K[keyof K]) => void;
}) {
    return function (this: This, update: Update) {
        const updateType = Object.keys(update)[0] as keyof typeof functions;
        if (updateType in functions) {
            const updateValue = update[updateType];
            const fn = functions[updateType] as (this: This, update: any) => void;
            fn.call(this, updateValue);
        }
    };
}