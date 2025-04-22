import { useCallback, useEffect, useMemo, useRef } from "react";
import { PreloadAssets } from "../Scenes/Game/Model/GameUpdate";
import { getCardUrl } from "../Scenes/Game/CardView";
import makeMapCache from "./MapCache";
import { SoundId } from "../Scenes/Game/Model/CardEnums";

const loadImage = makeMapCache((name: string) => {
    const image = new Image();
    image.src = getCardUrl(name);
    return image;
});

const loadSound = makeMapCache((name: SoundId) => {
    return new Audio(`/sounds/${name}.mp3`);
});

export default function useAssets(muteSounds: boolean = false) {
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

    return useMemo(() => ({
        playSound: (name: SoundId) => {
            if (!muteSounds) {
                clearCurrentAudio();
    
                const sound = loadSound(name);
                currentAudio.current = sound;
    
                sound.addEventListener('ended', clearCurrentAudio);
                sound.play();
            }
        },

        preloadAssets: ({ images, sounds }: PreloadAssets) => {
            images.forEach(loadImage);
            sounds.forEach(loadSound);
        }
    }), [muteSounds, clearCurrentAudio]);
}