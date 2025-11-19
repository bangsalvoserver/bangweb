export async function loadFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export async function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
    });
}

export async function loadAudio(src: string): Promise<HTMLAudioElement> {
    return new Promise((resolve, reject) => {
        const audio = new Audio(src);

        // If the audio is already cached, it may fire immediately or have readyState > 0
        if (audio.readyState >= 2) {
            resolve(audio);
            return;
        }

        const onLoaded = () => {
            cleanup();
            resolve(audio);
        };

        const onError = (e: Event) => {
            cleanup();
            reject(e);
        };

        const cleanup = () => {
            audio.removeEventListener("canplaythrough", onLoaded);
            audio.removeEventListener("error", onError);
        };

        audio.addEventListener("canplaythrough", onLoaded);
        audio.addEventListener("error", onError);

        // Trigger the load
        audio.load();
    });
}