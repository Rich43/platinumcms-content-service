import 'reflect-metadata';
import express, { Express, Router } from 'express';
import { serverSettings } from './config';
import log from './setup/logger';
import morganMiddleware from './setup/morgan.middleware';
import { createAppDataSource, extraConfig } from './setup/datasource';
import { Server } from 'socket.io';
import { createServer as crtSvr } from 'http';
import { ContentRepository, ContentRevisionRepository } from './repositories';
import { container } from 'tsyringe';
import { ContentController } from './controllers';

export async function createServer() {
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
    const instance = container.resolve(ContentController);
    const server = crtSvr(app);
    const io = new Server(server, {});
    const contentRouter = Router();
    app.use(`${serverSettings.context}/content`, contentRouter);
    contentRouter.get('/list', async function(req, res, next){
        res.send(await instance.list())
    });
    return app;
}

export function listen(app: Express) {
    // noinspection HttpUrlsUsage
    log.info(`Server is up and running @ http://${serverSettings.host}:${serverSettings.port}`);
    app.listen(serverSettings.port);
}

export async function configureAndListen() {
    const app = createServer();
    listen(await app);
}
