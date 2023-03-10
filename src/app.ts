import 'reflect-metadata';
import express, { Express } from 'express';
import { serverSettings } from './config';
import { routingConfigs } from './setup/routing.options';
import { useContainer as useContainerRouting, useExpressServer } from 'routing-controllers';
import { useContainer as useContainerValidator } from 'class-validator';
import log from './setup/logger';
import morganMiddleware from './setup/morgan.middleware';
import { createAppDataSource, extraConfig } from './setup/datasource';
import { container } from 'tsyringe';
import { SyringeAdapter } from './adapters';
import { ContentRepository, ContentRevisionRepository } from './repositories';

export function createServer() {
    const AppDataSource = createAppDataSource(extraConfig);
    log.info('Initialising server...');
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
    container.register('AppDataSource', {useValue: AppDataSource});
    container.register('ContentRepository', {useValue: ContentRepository(AppDataSource)});
    container.register('ContentRevisionRepository', {useValue: ContentRevisionRepository(AppDataSource)});
    const syringeAdapter = new SyringeAdapter(container);
    useContainerRouting(syringeAdapter);
    useContainerValidator(syringeAdapter);
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
