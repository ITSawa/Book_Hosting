"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
const errors_models_1 = require("../models/errors.models");
const SALT_ROUNDS = 10;
async function hashPassword(password) {
    try {
        const salt = await bcrypt_1.default.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        if (!hashedPassword) {
            throw new errors_models_1.StatusError('Error hashing password', 500);
        }
        return hashedPassword;
    }
    catch (error) {
        throw new errors_models_1.StatusError('Error hashing password', 500);
    }
}
async function comparePassword(password, hashedPassword) {
    try {
        const match = await bcrypt_1.default.compare(password, hashedPassword);
        if (!match) {
            throw new errors_models_1.StatusError('Email or password is incorrect', 401);
        }
        return match;
    }
    catch (error) {
        throw new errors_models_1.StatusError('Email or password is incorrect', 401);
    }
}
