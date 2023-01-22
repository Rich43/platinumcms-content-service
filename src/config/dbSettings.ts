import config from 'config';

const DATABASE_STORAGE = 'database.storage';
const DATABASE_DIALECT = 'database.dialect';
const DATABASE_HOST = 'database.host';
const DATABASE_PORT = 'database.port';
const DATABASE_USER = 'database.user';
const DATABASE_PASSWORD = 'database.password';
const DATABASE_DATABASE = 'database.database';

export const dbSettings = {
    storage: config.has(DATABASE_STORAGE) ? config.get<string>(DATABASE_STORAGE) : undefined,
    dialect: config.get<string>(DATABASE_DIALECT),
    dialectOptions: {
        host: config.has(DATABASE_HOST) ? config.get<string>(DATABASE_HOST) : undefined,
        port: config.has(DATABASE_PORT) ? config.get<number>(DATABASE_PORT) : undefined,
        user: config.has(DATABASE_USER) ? config.get<string>(DATABASE_USER) : undefined,
        password: config.has(DATABASE_PASSWORD) ? config.get<string>(DATABASE_PASSWORD) : undefined,
        database: config.has(DATABASE_DATABASE) ? config.get<string>(DATABASE_DATABASE) : undefined,
    },
};
