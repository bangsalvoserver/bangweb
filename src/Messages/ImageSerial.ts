export type ImagePixels = {
    width: number,
    height: number,
    pixels: string
};

async function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        let image = document.createElement('img');
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
    });
}

export async function serializeImage(src: string | undefined, scale?: number): Promise<ImagePixels | null> {
    if (!src) return null;

    let image = await loadImage(src);

    let canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    if (scale != undefined) {
        if (canvas.width > canvas.height) {
            canvas.height = scale * canvas.width / canvas.height;
            canvas.width = scale;
        } else {
            canvas.width = scale * canvas.height / canvas.width;
            canvas.height = scale;
        }
    }

    let ctx = canvas.getContext('2d');
    if (!ctx) {
        return null;
    }
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    let bytes = new Uint8ClampedArray(ctx.getImageData(0, 0, canvas.width, canvas.height).data.buffer);
    let binary = '';
    for (let i=0; i < bytes.byteLength; ++i) {
        binary += String.fromCharCode(bytes[i]);
    }
    return {width: canvas.width, height: canvas.height, pixels: window.btoa(binary)};
}

export function deserializeImage(data: ImagePixels | null): string | null {
    if (!data || data.width == 0 || data.height == 0) {
        return null;
    }

    let image_data = new ImageData(new Uint8ClampedArray(
        window.atob(data.pixels).split('').map((c) => c.charCodeAt(0))),
        data.width, data.height);

    let canvas = document.createElement('canvas');
    canvas.width = data.width;
    canvas.height = data.height;
    
    let ctx = canvas.getContext('2d');
    if (!ctx) {
        return null;
    }
    
    ctx.putImageData(image_data, 0, 0);

    return canvas.toDataURL();
}