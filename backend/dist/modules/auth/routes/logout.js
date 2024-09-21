"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_model_1 = require("../models/user.model");
const routeBuilder_1 = __importDefault(require("./helper/routeBuilder"));
const logoutRouter = express_1.default.Router();
logoutRouter.post('/logout', (0, routeBuilder_1.default)(async (req, res) => {
    const permission = await user_model_1.User.identifyRole(req.cookies.token);
    await permission.logout();
    return res.status(200).json({ message: 'Logged out successfully' });
}));
exports.default = logoutRouter;
