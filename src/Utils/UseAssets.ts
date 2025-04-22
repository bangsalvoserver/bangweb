import { useCallback, useEffect, useMemo, useRef } from "react";
import { getCardUrl } from "../Scenes/Game/CardView";
import { SoundId } from "../Scenes/Game/Model/CardEnums";
import { PreloadAssets } from "../Scenes/Game/Model/GameUpdate";
import { loadAudio, loadImage } from "./ImageSerial";
import makeMapCache from "./MapCache";

const loadCardImage = makeMapCache((name: string) => loadImage(getCardUrl(name)));
const loadGameSound = makeMapCache((name: SoundId) => loadAudio(`/sounds/${name}.mp3`));

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
        playSound: async (name: SoundId) => {
            if (!muteSounds) {
                clearCurrentAudio();
    
                const sound = await loadGameSound(name);
                currentAudio.current = sound;
    
                sound.addEventListener('ended', clearCurrentAudio);
                sound.play();
            }
        },

        preloadAssets: async ({ images, sounds }: PreloadAssets) => {
            return Promise.all([
                Promise.all(images.map(loadCardImage)),
                Promise.all(sounds.map(loadGameSound))
            ]);
        }
    }), [muteSounds, clearCurrentAudio]);
}