function csvEscape(value: string): string {
    if (/[",\r\n]/.test(value)) {
        return '"' + value.replace(/"/g, '""') + '"';
    }
    return value;
}

export function downloadCsv(filename: string, rows: string[][]): void {
    const csvContent = rows.map(row => row.map(csvEscape).join(',')).join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

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