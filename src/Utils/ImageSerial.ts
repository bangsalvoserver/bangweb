import { loadImage } from "./FileUtils";

export const PROPIC_SIZE = 512;

export async function serializeImage(src: string | undefined, scale?: number): Promise<string | null> {
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