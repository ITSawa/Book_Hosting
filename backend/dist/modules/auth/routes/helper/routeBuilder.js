"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_models_1 = require("../../models/errors.models");
const routeHandler = (handler) => {
    return async (req, res, next) => {
        try {
            return await handler(req, res, next);
        }
        catch (error) {
            const message = error instanceof errors_models_1.StatusError ? error.message : 'Something went wrong';
            const status = error instanceof errors_models_1.StatusError ? error.status : 500;
            return res.status(status).json({ message });
        }
    };
};
exports.default = routeHandler;
