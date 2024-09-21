import { StatusError } from '../../../answers/errorStatus';

export async function reqBuilder(func: Function, message: string, status: number) {
    try {
        const result = await func();
        if (!result) {
            throw new StatusError(message, status);
        }
        return result;
    } catch (error) {
        console.error(error);
        throw new StatusError(message, status);
    }
};
