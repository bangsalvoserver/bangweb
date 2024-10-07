import { inflate, deflate } from 'pako';
import { base64ToBytes, bytesToBase64 } from './Base64Utils';

export interface ImagePixels {
    width: number;
    height: number;
    pixels: string;
}

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

export async function serializeImage(src: ImageSrc | undefined, scale?: number): Promise<ImagePixels | null> {
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

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = bytesToBase64(deflate(imageData.data.buffer));

    return { width: canvas.width, height: canvas.height, pixels };
}

export function deserializeImage(data: ImagePixels | null): ImageSrc | undefined {
    try {
        if (!data || data.width === 0 || data.height === 0) {
            return undefined;
        }

        const pixels = new Uint8ClampedArray(inflate(base64ToBytes(data.pixels)));
        let imageData = new ImageData(pixels, data.width, data.height);

        let canvas = document.createElement('canvas');
        canvas.width = data.width;
        canvas.height = data.height;
        
        let ctx = canvas.getContext('2d');
        if (!ctx) {
            return undefined;
        }
        
        ctx.putImageData(imageData, 0, 0);

        return canvas.toDataURL();
    } catch (e) {
        console.error('Cannot deserialize image: ' + e);
        return undefined;
    }
}