"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwts = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_loader_1 = require("../controllers/env.loader");
const errors_models_1 = require("../models/errors.models");
async function validateToken(token, secret) {
    if (!token || typeof token !== 'string') {
        throw new errors_models_1.StatusError('Invalid token', 401);
    }
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(new errors_models_1.StatusError('Failed to validate token', 401));
            }
            else {
                resolve(decoded);
            }
        });
    });
}
async function createToken(payload, secret) {
    if (!payload || typeof payload !== 'object') {
        throw new errors_models_1.StatusError('Invalid payload', 401);
    }
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, secret, (err, token) => {
            if (err) {
                reject(new errors_models_1.StatusError('Failed to create token', 401));
            }
            else {
                resolve(token);
            }
        });
    });
}
async function validateRefreshToken(token) {
    return await validateToken(token, env_loader_1.secrets.refresh);
}
async function validateAccessToken(token) {
    return await validateToken(token, env_loader_1.secrets.access);
}
async function createRefreshToken(payload) {
    return await createToken(payload, env_loader_1.secrets.refresh);
}
async function createAccessToken(payload) {
    return await createToken(payload, env_loader_1.secrets.access);
}
exports.jwts = {
    validateRefreshToken,
    validateAccessToken,
    createRefreshToken,
    createAccessToken
};
