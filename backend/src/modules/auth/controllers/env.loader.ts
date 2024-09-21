import path from 'path';
import dotenv from 'dotenv';

const env_file = path.join(__dirname, '../../../../.env');
console.log(env_file);
dotenv.config({ path: env_file, override: true });

function getEnv(key: string): string {
    const env = process.env[key];
    if (!env) {
        throw new Error(`Environment variable ${key} not found`);
    }
    return env;
}

type secrets_type = {
    access: string,
    refresh: string
    cookie_sign: string
}

const secrets: secrets_type = {
    access: getEnv('ACCESS_SECRET'),
    refresh: getEnv('REFRESH_SECRET'),
    cookie_sign: getEnv('COOKIE_SIGN'),
}

type pg_config_type = {
    type: 'postgres',
    host: string,
    port: number,
    username: string,
    password: string,
    database: string
}

const pg_config: pg_config_type = {
    type: 'postgres',
    host: getEnv('PG_HOST'),
    port: parseInt(getEnv('PG_PORT')),
    username: getEnv('PG_LOGIN'),
    password: getEnv('PG_PASS'),
    database: getEnv('PG_NAME'),
}

export { secrets, pg_config }