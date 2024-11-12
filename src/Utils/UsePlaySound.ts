import { useCallback, useEffect, useRef } from "react";
import { computeIfAbsent } from "./ArrayUtils";

const soundsMap = new Map<string, HTMLAudioElement>();

export default function usePlaySound(muteSounds: boolean = false) {
    const currentAudio = useRef<HTMLAudioElement>();

    const clearCurrentAudio = useCallback(() => {
        if (currentAudio.current) {
            currentAudio.current.removeEventListener('ended', clearCurrentAudio);
            currentAudio.current.pause();
            currentAudio.current.currentTime = 0;
            currentAudio.current = undefined;
        }
    }, []);

    useEffect(() => {
        if (muteSounds) {
            clearCurrentAudio();
        }

        return clearCurrentAudio;
    }, [muteSounds, clearCurrentAudio]);

    const playSound = useCallback((name: string) => {
        if (!muteSounds) {
            clearCurrentAudio();

            const sound = computeIfAbsent(soundsMap, name, () => new Audio(`/sounds/${name}.mp3`));
            currentAudio.current = sound;

            sound.addEventListener('ended', clearCurrentAudio);
            sound.play();
        }
    }, [muteSounds, clearCurrentAudio]);

    return playSound;
}