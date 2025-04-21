export default function makeMapCache<K, V>(supplier: (value: K) => V) {
    const cache = new Map<K, V>();
    return (key: K) => {
        let value = cache.get(key);
        if (value === undefined) {
            value = supplier(key);
            cache.set(key, value);
        }
        return value;
    };
}