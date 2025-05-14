import { useCallback, useEffect, useRef } from "react";
import useEvent from "react-use-event-hook";
import { getCardUrl } from "../Scenes/Game/CardView";
import { SoundId } from "../Scenes/Game/Model/CardEnums";
import { PreloadAssets } from "../Scenes/Game/Model/GameUpdate";
import { loadImage } from "./ImageSerial";
import makeMapCache from "./MapCache";

const loadCardImage = makeMapCache((name: string) => loadImage(getCardUrl(name)));
const loadGameSound = makeMapCache((name: SoundId) => new Audio(`/sounds/${name}.mp3`));

export function usePlaySound(muteSounds: boolean = false) {
    const currentAudio = useRef<HTMLAudioElement>(undefined);

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

    return useEvent((name: SoundId) => {
        if (!muteSounds) {
            clearCurrentAudio();

            const sound = loadGameSound(name);
            currentAudio.current = sound;

            sound.addEventListener('ended', clearCurrentAudio);
            sound.play();
        }
    });
}

export async function preloadAssets({ images, sounds }: PreloadAssets) {
    for (const sound of sounds) {
        try {
            loadGameSound(sound);
        } catch (e) {
            console.error('error preloading sound', e);
        }
    }
    await Promise.allSettled(images.map(loadCardImage));
}