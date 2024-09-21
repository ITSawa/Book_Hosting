"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const env_loader_1 = require("./modules/auth/controllers/env.loader");
const login_1 = __importDefault(require("./modules/auth/routes/login"));
const registration_1 = __importDefault(require("./modules/auth/routes/registration"));
const refresh_1 = __importDefault(require("./modules/auth/routes/refresh"));
const logout_1 = __importDefault(require("./modules/auth/routes/logout"));
const pg_connect_init_1 = require("./inits/pg.connect.init");
pg_connect_init_1.AppDataSource.initialize().then(() => {
    console.log('Cookie Sign:', env_loader_1.secrets.cookie_sign);
    const app = (0, express_1.default)();
    const port = 3001;
    app.use('/', login_1.default, registration_1.default, refresh_1.default, logout_1.default);
    app.use((0, cookie_parser_1.default)(env_loader_1.secrets.cookie_sign));
    app.get('/', (req, res) => {
        res.status(200).send('backend server is running!');
    });
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch(error => console.log(error));
