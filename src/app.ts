import Koa from 'koa';

export function configure() {
    const app = new Koa();
    app.use(ctx => {
        ctx.body = 'Hello Koa';
    });
    return app;
}

export function listen(app: Koa<Koa.DefaultState, Koa.DefaultContext>) {
    app.listen(3000);
}

export function configureAndListen() {
    const app = configure();
    listen(app);
}
