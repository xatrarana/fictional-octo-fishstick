
export const enc = (value: string) => {
    const buffer = Buffer.from(value);
    return buffer.toString("base64");
}


export const dec = (cipher: string) => {
    const buffer = Buffer.from(cipher, 'base64');
    return buffer.toString();
}