"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const env_loader_1 = require("../modules/auth/controllers/env.loader");
const User_1 = require("./dbmodels/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: env_loader_1.pg_config.host,
    port: env_loader_1.pg_config.port,
    username: env_loader_1.pg_config.username,
    password: env_loader_1.pg_config.password,
    database: env_loader_1.pg_config.database,
    synchronize: true,
    logging: true,
    entities: [
        User_1.Users
    ],
    migrations: [
        __dirname + '/migration/**/*.ts'
    ],
    subscribers: [
        __dirname + '/subscriber/**/*.ts'
    ]
});
