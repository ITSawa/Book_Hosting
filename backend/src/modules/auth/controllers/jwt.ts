import jwt from 'jsonwebtoken';
import type { jwtUserPayload } from '../@types/validation.types';
import { secrets } from '../controllers/env.loader';
import { StatusError } from '../../../inits/answers/errorStatus';

async function validateToken(token: string, secret: string): Promise<object> {
    if (!token || typeof token !== 'string') { 
        throw new StatusError('Invalid token', 401); 
    }

    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                console.error('Token validation error:', err);
                reject(new StatusError('Failed to validate token', 401));
            } else {
                resolve(decoded as any);
            }
        });
    });
}

async function createToken(payload: object, secret: string, liveTime: string = '1h'): Promise<string> {
    if (!payload || typeof payload !== 'object' || Object.keys(payload).length === 0) { 
        throw new StatusError('Invalid payload', 401); 
    }

    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, { expiresIn: liveTime }, (err, token) => {
            if (err) {
                console.error('Token creation error:', err);
                reject(new StatusError('Failed to create token', 401));
            } else {
                resolve(token as string);
            }
        });
    });
}

async function validateRefreshToken(token: string): Promise<object> {
    return await validateToken(token, secrets.refresh);
}

async function validateAccessToken(token: string): Promise<object> {
    return await validateToken(token, secrets.access);
}

async function createRefreshToken(payload: jwtUserPayload): Promise<string> {
    return await createToken(payload, secrets.refresh, '7d');
}

async function createAccessToken(payload: jwtUserPayload): Promise<string> {
    return await createToken(payload, secrets.access, '1h');
}

export const jwts = {
    validateRefreshToken,
    validateAccessToken,
    createRefreshToken,
    createAccessToken
}

// test

// const payload = {
//     id: 1,
//     name: 'Test',
//     email: 'test',
//     role: 'client'
// }

// async function test() { 
//     const token = await createRefreshToken(payload);
//     console.log(token);

//     const decoded = await validateRefreshToken(token);
//     console.log(decoded);

//     const token2 = await createAccessToken(payload);
//     console.log(token2);

//     const decoded2 = await validateAccessToken(token2);
//     console.log(decoded2);
// }

// test()