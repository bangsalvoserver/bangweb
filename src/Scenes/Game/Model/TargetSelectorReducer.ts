import { RequestStatusUnion, TargetSelectorState } from "./TargetSelector";

export type TargetSelectorUpdate =
    {setRequest:RequestStatusUnion};

const reducers: Record<string, (selector: TargetSelectorState, update: any) => TargetSelectorState> = {
    setRequest: (selector: TargetSelectorState, request: RequestStatusUnion): TargetSelectorState => {
        return { ...selector, request }
    }
};

export function targetSelectorReduce(selector: TargetSelectorState, update: TargetSelectorUpdate) {
    const updateType = Object.keys(update)[0];
    const updateValue = Object.values(update)[0];
    if (updateType in reducers) {
        return reducers[updateType](selector, updateValue);
    } else {
        return selector;
    }
}