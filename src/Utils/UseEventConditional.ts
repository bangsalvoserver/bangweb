import useEvent from "react-use-event-hook";

type AnyFunction = (...args: any[]) => any;

export default function useEventConditional<TCallback extends AnyFunction>(condition: boolean, callback: TCallback): TCallback | undefined {
    const callbackMemo = useEvent(callback);
    return condition ? callbackMemo : undefined;
}