"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pg_config = exports.secrets = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const env_file = path_1.default.join(__dirname, '../../../../.env');
console.log(env_file);
dotenv_1.default.config({ path: env_file, override: true });
function getEnv(key) {
    const env = process.env[key];
    if (!env) {
        throw new Error(`Environment variable ${key} not found`);
    }
    return env;
}
const secrets = {
    access: getEnv('ACCESS_SECRET'),
    refresh: getEnv('REFRESH_SECRET'),
    cookie_sign: getEnv('COOKIE_SIGN'),
};
exports.secrets = secrets;
const pg_config = {
    type: 'postgres',
    host: getEnv('PG_HOST'),
    port: parseInt(getEnv('PG_PORT')),
    username: getEnv('PG_LOGIN'),
    password: getEnv('PG_PASS'),
    database: getEnv('PG_NAME'),
};
exports.pg_config = pg_config;
