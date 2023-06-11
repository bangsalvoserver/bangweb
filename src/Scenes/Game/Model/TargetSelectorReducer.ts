import { createUnionReducer } from "../../../Utils/UnionUtils";
import { RequestStatusUnion, TargetSelectorState } from "./TargetSelector";

export type TargetSelectorUpdate =
    { setRequest: RequestStatusUnion };

const targetSelectorReducer = createUnionReducer<TargetSelectorState, TargetSelectorUpdate>({
    setRequest (request) {
        return { ...this, request };
    }
});

export default targetSelectorReducer;