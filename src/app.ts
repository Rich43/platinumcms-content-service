import 'reflect-metadata';
import Koa from 'koa';
import { serverSettings } from './config';
import { Container } from 'typedi';
import { routingConfigs } from './setup/routing.options';
import { useMiddlewares } from './setup/koa.middlewares';
import { useContainer, useKoaServer } from 'routing-controllers';

export function createServer() {
    const koa: Koa = new Koa();

    useMiddlewares(koa);
    useContainer(Container);

    return useKoaServer<Koa>(koa, routingConfigs);
}

export function listen(app: Koa) {
    app.listen(serverSettings.port);
}

export function configureAndListen() {
    const app = createServer();
    listen(app);
}
