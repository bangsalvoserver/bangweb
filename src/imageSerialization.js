export function serialize_image(image, scale) {
    if (!image || image.width === 0 || image.height === 0) {
        return {width:0, height:0, pixels:""};
    }

    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    ctx.width = image.width;
    ctx.height = image.height;
    if (scale !== undefined) {
        if (ctx.width > ctx.height) {
            ctx.height = scale * ctx.width / ctx.height;
            ctx.width = scale;
        } else {
            ctx.width = scale * ctx.height / ctx.width;
            ctx.height = scale;
        }
    }
    ctx.drawImage(image, 0, 0, ctx.width, ctx.height);

    let bytes = new Uint8ClampedArray(ctx.getImageData(0, 0, ctx.width, ctx.height).data.buffer);
    return {width:ctx.width, height:ctx.height, pixels:window.btoa(String.fromCharCode.apply(null, bytes))};
}

export function deserialize_image(data) {
    if (!data || data.width === 0 || data.height === 0) {
        return null;
    }

    let image_data = new ImageData(
        new Uint8ClampedArray(
            window.atob(data.pixels).split('').map((c) => c.charCodeAt(0))),
        data.width, data.height);

    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = image_data.width;
    canvas.height = image_data.height;
    ctx.putImageData(image_data, 0, 0);

    let image = new Image(image_data.width, image_data.height);
    image.src = canvas.toDataURL();
    return image;
}

