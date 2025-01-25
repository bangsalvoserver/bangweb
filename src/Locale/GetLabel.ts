import { labelRegistry } from "./Registry";

export function hasLabel(group: string, name: string) {
    if (group in labelRegistry) {
        return name in labelRegistry[group];
    }
    return false;
}

export default function getLabel(group: string, name: string, ...formatArgs: string[]): string {
    if (group in labelRegistry) {
        const labelGroup = labelRegistry[group];
        if (name in labelGroup) {
            const value = labelGroup[name];
            if (typeof value === 'function') {
                return value(...formatArgs);
            } else {
                return value;
            }
        }
    }
    return group + '.' + name;
}
