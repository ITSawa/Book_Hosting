"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqBuilder = reqBuilder;
const errors_models_1 = require("../../../modules/auth/models/errors.models");
async function reqBuilder(func, message, status) {
    try {
        const result = await func();
        if (!result) {
            throw new errors_models_1.StatusError(message, status);
        }
        return result;
    }
    catch (error) {
        throw new errors_models_1.StatusError(message, status);
    }
}
;
