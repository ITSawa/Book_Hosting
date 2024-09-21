"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusError = void 0;
class StatusError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
exports.StatusError = StatusError;
