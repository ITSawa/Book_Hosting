"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const errors_models_1 = require("../models/errors.models");
function isSqlInjection(input) {
    const sqlInjectionPatterns = [
        /SELECT\s.*\sFROM\s/i,
        /UNION\sALL\sSELECT\s/i,
        /INSERT\sINTO\s/i,
        /DELETE\sFROM\s/i,
        /UPDATE\s.*\sSET\s/i,
        /DROP\sTABLE\s/i,
        /--\s*$/i,
        /;\s*$/i,
        /\bOR\b\s+\b1\b\s*=\s*1\b/i,
        /\bAND\b\s+\b1\b\s*=\s*1\b/i,
        /\bEXEC\b\s/i,
        /\bEXECUTE\b\s/i,
        /\bTRUNCATE\b\s/i,
        /\bCALL\b\s/i,
        /\bREPLACE\b\s/i,
        /\bALTER\b\s/i,
        /\bCREATE\b\s/i
    ];
    for (const pattern of sqlInjectionPatterns) {
        if (pattern.test(input)) {
            throw new errors_models_1.StatusError('Potential SQL injection detected', 400);
        }
    }
}
function isScriptInjection(input) {
    const scriptInjectionPatterns = [
        /<script\b/i,
        /<\/script\b/i
    ];
    for (const pattern of scriptInjectionPatterns) {
        if (pattern.test(input)) {
            throw new errors_models_1.StatusError('Potential script injection detected', 400);
        }
    }
}
function validateEmail(email) {
    if (!email || typeof email !== 'string') {
        throw new errors_models_1.StatusError('Invalid email', 400);
    }
    if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        throw new errors_models_1.StatusError('Invalid email', 400);
    }
    isSqlInjection(email);
    isScriptInjection(email);
}
function validatePassword(password) {
    if (!password || typeof password !== 'string') {
        throw new errors_models_1.StatusError('Invalid password', 400);
    }
    if (password.length < 8) {
        throw new errors_models_1.StatusError('Password must be at least 8 characters long', 400);
    }
}
function validateName(name) {
    if (!name || typeof name !== 'string' || name.length < 3 || name.length > 100) {
        throw new errors_models_1.StatusError('Invalid name', 400);
    }
    isSqlInjection(name);
    isScriptInjection(name);
}
const valid_roles = ['client', 'subscriber', 'admin'];
function validateRole(role) {
    if (!role || typeof role !== 'string' || !valid_roles.includes(role)) {
        throw new errors_models_1.StatusError('Invalid role', 400);
    }
}
function validateUserPayload(payload) {
    if (!payload || typeof payload !== 'object') {
        throw new errors_models_1.StatusError('Invalid payload', 400);
    }
    const { id, name, email, role } = payload;
    if (!id) {
        throw new errors_models_1.StatusError('Invalid payload', 400);
    }
    validateName(name);
    validateEmail(email);
    validateRole(role);
}
function validateLoginData(loginData) {
    validateEmail(loginData.email);
    validatePassword(loginData.password);
}
function validateRegistrationData(registrationData) {
    validateName(registrationData.name);
    validateEmail(registrationData.email);
    validatePassword(registrationData.password);
}
exports.validation = {
    validateUserPayload,
    validateLoginData,
    validateRegistrationData
};
