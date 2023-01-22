import Koa from 'koa';
import { serverSettings } from './config';

export function configure() {
    const app = new Koa();
    app.use(ctx => {
        ctx.body = 'Hello ' + serverSettings.name;
    });
    return app;
}

export function listen(app: Koa<Koa.DefaultState, Koa.DefaultContext>) {
    app.listen(serverSettings.port);
}

export function configureAndListen() {
    const app = configure();
    listen(app);
}
