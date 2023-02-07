import { DataSource } from 'typeorm';
import { dbSettings } from '../config';
import log from './logger';
import * as models from '../models';
import { dictToArray } from './utils';

const remoteDBBase = {
    host: dbSettings.dialectOptions.host,
    port: dbSettings.dialectOptions.port,
    username: dbSettings.dialectOptions.user,
    password: dbSettings.dialectOptions.password,
    database: dbSettings.dialectOptions.database,
};

export const extraConfig = {
    logging: true,
    synchronize: true,
    entities: dictToArray(models),
    subscribers: [],
    migrations: [],
};

export function createAppDataSource(extraConfig: object) {
    let AppDataSource: DataSource | undefined = undefined;
    if (dbSettings.dialect === 'mysql') {
        AppDataSource = new DataSource({
            type: dbSettings.dialect,
            ...remoteDBBase,
            ...extraConfig
        });
    } else if (dbSettings.dialect === 'postgres') {
        AppDataSource = new DataSource({
            type: dbSettings.dialect,
            ...remoteDBBase,
            ...extraConfig
        });
    } else if (dbSettings.dialect === 'sqlite') {
        AppDataSource = new DataSource({
            type: dbSettings.dialect,
            database: dbSettings.dialectOptions.database!,
            ...extraConfig
        });
    } else {
        log.error('Invalid DB Settings');
        process.exit(1);
    }
    return AppDataSource;
}
