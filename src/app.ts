import Koa from 'koa';
import 'reflect-metadata';
import { serverSettings } from './config';
import { createKoaServer } from 'routing-controllers';
import { ContentController } from './controllers';

export function configure() {
    return createKoaServer({
        controllers: [ContentController],
    });
}

export function listen(app: Koa<Koa.DefaultState, Koa.DefaultContext>) {
    app.listen(serverSettings.port);
}

export function configureAndListen() {
    const app = configure();
    listen(app);
}
