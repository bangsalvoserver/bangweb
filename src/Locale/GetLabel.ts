import { labelRegistry } from "./Registry";

export default function getLabel(group: string, name: string, ...formatArgs: string[]): string {
    if (group in labelRegistry) {
        const labelGroup = labelRegistry[group];
        if (name in labelGroup) {
            const value = labelGroup[name];
            if (typeof value == 'function') {
                return value(...formatArgs);
            } else {
                return value;
            }
        }
    }
    return group + '.' + name;
}
