export const getNanoid = async () => {
    const { nanoid } = await import('nanoid');
    return nanoid();
}