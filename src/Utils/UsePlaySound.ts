import { useCallback, useEffect, useRef } from "react";
import { useMapRef } from "./UseMapRef";
import useEvent from "react-use-event-hook";

export default function usePlaySound(muteSounds: boolean = false) {
    const soundsMap = useMapRef<string, HTMLAudioElement>();
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

    const playSound = useEvent((name: string) => {
        if (!muteSounds) {
            clearCurrentAudio();

            let sound = soundsMap.get(name);
            if (sound === null) {
                sound = new Audio(`/sounds/${name}.wav`);
                soundsMap.set(name, sound);
            }

            sound.addEventListener('ended', clearCurrentAudio);
            sound.play();

            currentAudio.current = sound;
        }
    });

    return playSound;
}