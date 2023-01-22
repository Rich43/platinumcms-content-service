import 'reflect-metadata';
import express, { Express } from 'express';
import { serverSettings } from './config';
import { Container } from 'typedi';
import { routingConfigs } from './setup/routing.options';
import { useContainer, useExpressServer } from 'routing-controllers';

export function createServer() {
    const app = express();
    useContainer(Container);
    return useExpressServer(app, routingConfigs);
}

export function listen(app: Express) {
    app.listen(serverSettings.port);
}

export function configureAndListen() {
    const app = createServer();
    listen(app);
}
