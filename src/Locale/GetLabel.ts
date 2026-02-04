import { getRegistries, Language } from "./Registry";

export function hasLabel(language: Language, group: string, name: string) {
    const { labelRegistry } = getRegistries(language);
    if (group in labelRegistry) {
        return name in labelRegistry[group];
    }
    return false;
}

export default function getLabel(language: Language, group: string, name: string, ...formatArgs: string[]): string {
    const { labelRegistry } = getRegistries(language);
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
