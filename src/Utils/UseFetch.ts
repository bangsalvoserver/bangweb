import { useEffect, useState } from "react";

export default function useFetch<T, E = undefined>(url: string, errorValue?: E): T | E | undefined {
    const [result, setResult] = useState<T | E>();

    useEffect(() => {
        let fetching = true;
        (async () => {
            const response = await fetch(url);
            if (response.ok) {
                const json = await response.json();
                if (fetching) {
                    setResult(json);
                }
            } else {
                setResult(errorValue);
            }
        })();
        return () => { fetching = false; };
    }, [url, errorValue]);

    return result;
}