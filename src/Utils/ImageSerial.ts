export type ImageSrc = string;

export async function loadFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export async function loadImage(src: ImageSrc): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        let image = document.createElement('img');
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
    });
}

export const PROPIC_SIZE = 512;

export async function serializeImage(src: ImageSrc | undefined, scale?: number): Promise<ImageSrc | null> {
    if (!src) return null;
    
    let image = await loadImage(src);

    let canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    if (scale !== undefined) {
        if (canvas.width > canvas.height) {
            if (scale < image.width) {
                canvas.height = scale * canvas.height / canvas.width;
                canvas.width = scale;
            }
        } else {
            if (scale < image.height) {
                canvas.width = scale * canvas.width / canvas.height;
                canvas.height = scale;
            }
        }
    }

    let ctx = canvas.getContext('2d');
    if (!ctx) {
        return null;
    }
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL('image/png');
}