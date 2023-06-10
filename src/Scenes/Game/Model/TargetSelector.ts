import { RequestStatusArgs, StatusReadyArgs } from "./GameUpdate";

export type RequestStatusUnion = RequestStatusArgs | StatusReadyArgs | {};

export interface TargetSelectorState {
    request: RequestStatusUnion;
}

export function newTargetSelector(): TargetSelectorState {
    return {
        request: {}
    };
}