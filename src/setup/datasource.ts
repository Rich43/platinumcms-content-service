import { DataSource } from 'typeorm';
import { dbSettings } from '../config';
import log from './logger';

let AppDataSource: DataSource | undefined = undefined;
if (dbSettings.dialect === 'mysql') {
    AppDataSource = new DataSource({
        type: dbSettings.dialect,
        host: dbSettings.dialectOptions.host,
        port: dbSettings.dialectOptions.port,
        username: dbSettings.dialectOptions.user,
        password: dbSettings.dialectOptions.password,
        database: dbSettings.dialectOptions.database,
    });
} else if (dbSettings.dialect === 'postgres') {
        AppDataSource = new DataSource({
            type: dbSettings.dialect,
            host: dbSettings.dialectOptions.host,
            port: dbSettings.dialectOptions.port,
            username: dbSettings.dialectOptions.user,
            password: dbSettings.dialectOptions.password,
            database: dbSettings.dialectOptions.database,
        });
} else if (dbSettings.dialect === 'sqlite') {
    AppDataSource = new DataSource({
        type: dbSettings.dialect,
        database: dbSettings.dialectOptions.database!
    });
} else {
    log.error("Invalid DB Settings");
    process.exit(1);
}


export default AppDataSource!;
