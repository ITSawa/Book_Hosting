"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_model_1 = require("../models/user.model");
const routeBuilder_1 = __importDefault(require("./helper/routeBuilder"));
const setCookie_1 = require("./helper/setCookie");
const registrationRouter = express_1.default.Router();
registrationRouter.post('/registration', (0, routeBuilder_1.default)(async (req, res) => {
    const { name, email, password } = req.body;
    const permission = new user_model_1.Unauthorized();
    const data = await permission.registration(name, email, password);
    res.cookie('access_token', data.access_token, setCookie_1.cookieAccessOptions);
    res.cookie('refresh_token', data.refresh_token, setCookie_1.cookieRefreshOptions);
    return res.status(200).json({ message: 'Registered successfully' });
}));
exports.default = registrationRouter;
