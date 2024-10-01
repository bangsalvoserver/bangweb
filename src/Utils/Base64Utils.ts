export function bytesToBase64(bytes: Uint8Array): string {
    let binary = '';
    for (let i=0; i < bytes.byteLength; ++i) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

export function base64ToBytes(input: string): Uint8Array {
    const binary = window.atob(input);
    let bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; ++i) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
}