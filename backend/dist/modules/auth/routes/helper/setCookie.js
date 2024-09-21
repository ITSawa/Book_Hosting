"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieAccessOptions = exports.cookieRefreshOptions = void 0;
const cookieOptionsAbstract = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    sameSite: 'strict',
    maxAge: 0
};
const cookieRefreshOptions = {
    ...cookieOptionsAbstract,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};
exports.cookieRefreshOptions = cookieRefreshOptions;
const cookieAccessOptions = {
    ...cookieOptionsAbstract,
    maxAge: 30 * 60 * 1000 // 30 minutes
};
exports.cookieAccessOptions = cookieAccessOptions;
