import 'reflect-metadata';
import express, { Express } from 'express';
import { serverSettings } from './config';
import { Container } from 'typedi';
import { routingConfigs } from './setup/routing.options';
import { useContainer, useExpressServer } from 'routing-controllers';
import log from './setup/logger';
import morganMiddleware from './setup/morgan.middleware';
import AppDataSource from './setup/datasource';

export function createServer() {
    log.info("Initialising server...");
    AppDataSource.initialize()
        .then(() => {
            log.info(`Data Source has been initialized! Dialect: ${AppDataSource.options.type} Database: ${AppDataSource.options.database}`);
        })
        .catch((err) => {
            log.error(`Error during Data Source initialization. Dialect: ${AppDataSource.options.type} Database: ${AppDataSource.options.database}`, err);
            process.exit(1);
        });
    const app = express();
    app.use(morganMiddleware);
    useContainer(Container);
    return useExpressServer(app, routingConfigs);
}

export function listen(app: Express) {
    // noinspection HttpUrlsUsage
    log.info(`Server is up and running @ http://${serverSettings.host}:${serverSettings.port}`);
    app.listen(serverSettings.port);
}

export function configureAndListen() {
    const app = createServer();
    listen(app);
}
