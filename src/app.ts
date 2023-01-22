import 'reflect-metadata';
import express, { Express } from 'express';
import { serverSettings } from './config';
import { Container } from 'typedi';
import { routingConfigs } from './setup/routing.options';
import { useContainer, useExpressServer } from 'routing-controllers';
import log from './setup/logger';
import morganMiddleware from './setup/morganMiddleware';

export function createServer() {
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
