import { useCallback, useEffect, useRef } from "react";
import useEvent from "react-use-event-hook";
import { getCardUrl } from "../Scenes/Game/CardView";
import { SoundId } from "../Scenes/Game/Model/CardEnums";
import { PreloadAssets } from "../Scenes/Game/Model/GameUpdate";
import makeMapCache from "./MapCache";
import { loadAudio, loadImage } from "./FileUtils";

const loadCardImage = makeMapCache((name: string) => loadImage(getCardUrl(name)));
const loadGameSound = makeMapCache((name: SoundId) => loadAudio(`/sounds/${name}.mp3`));

export function usePlaySound(muteSounds: boolean = false) {
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

    return useEvent(async (name: SoundId) => {
        if (!muteSounds) {
            clearCurrentAudio();

            const sound = await loadGameSound(name);
            currentAudio.current = sound;

            sound.addEventListener('ended', clearCurrentAudio);
            sound.play();
        }
    });
}

async function asyncTimer(timeout: number): Promise<void> {
    return new Promise((resolve, reject) => {
       setTimeout(resolve, timeout);
    });
}

const PRELOAD_TIMEOUT = 10000;

export async function preloadAssets({ images, sounds }: PreloadAssets) {
    return Promise.race([
        Promise.allSettled([
            ...images.map(loadCardImage),
            ...sounds.map(loadGameSound)
        ]),
        asyncTimer(PRELOAD_TIMEOUT)
    ]);
}