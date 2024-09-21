import { Request } from 'express';
import { StatusError } from '../../../../inits/answers/errorStatus';

export function getCookie(req: Request, name: string) {
    if (!req.signedCookies) {
        throw new StatusError('Token isn\'t found', 401);
    }

    const result = req.signedCookies[name];
    if (!result) {
        throw new StatusError('Token isn\'t found', 401);
    }
    return result;
}