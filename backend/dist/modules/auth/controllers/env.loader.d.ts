type secrets_type = {
    access: string;
    refresh: string;
    cookie_sign: string;
};
declare const secrets: secrets_type;
type pg_config_type = {
    type: 'postgres';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
};
declare const pg_config: pg_config_type;
export { secrets, pg_config };
//# sourceMappingURL=env.loader.d.ts.map