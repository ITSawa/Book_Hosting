import type { jwtUserPayload } from '../@types/validation.types';
declare function validateRefreshToken(token: string): Promise<object>;
declare function validateAccessToken(token: string): Promise<object>;
declare function createRefreshToken(payload: jwtUserPayload): Promise<string>;
declare function createAccessToken(payload: jwtUserPayload): Promise<string>;
export declare const jwts: {
    validateRefreshToken: typeof validateRefreshToken;
    validateAccessToken: typeof validateAccessToken;
    createRefreshToken: typeof createRefreshToken;
    createAccessToken: typeof createAccessToken;
};
export {};
//# sourceMappingURL=jwt.d.ts.map