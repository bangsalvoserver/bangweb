import { useEffect, useState } from "react";

export default function useFetch<T>(url: string): T | undefined {
    const [result, setResult] = useState<T>();

    useEffect(() => {
        let fetching = true;
        (async () => {
            const response = await fetch(url);
            if (response.ok) {
                const json = await response.json();
                if (fetching) {
                    setResult(json);
                }
            }
        })();
        return () => { fetching = false; };
    }, [url]);

    return result;
}