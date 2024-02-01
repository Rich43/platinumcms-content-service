import 'reflect-metadata';
import express, { Express, Router } from 'express';
import { serverSettings } from './config';
import log from './setup/logger';
import morganMiddleware from './setup/morgan.middleware';
import { createAppDataSource, extraConfig } from './setup/datasource';
import { Server } from 'socket.io';
import { ContentRepository, ContentRevisionRepository } from './repositories';
import { container } from 'tsyringe';
import { ContentController } from './controllers';
import { CreateContentRequestDto, UpdateContentRequestDto } from './dto';
import { createServer as crtSvr } from 'node:http';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import bodyParser from 'body-parser';
import path from 'path';

function router(app: Express, instance: ContentController, io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    const contentRouter = Router();
    app.use(bodyParser.json())
    app.use(`${serverSettings.context}/content`, contentRouter);
    contentRouter.get('/list', async function (req, res, next) {
        res.send(await instance.list());
    });
    contentRouter.get('/read/:id', async function (req, res, next) {
        res.send(await instance.read(parseInt(req.params.id)));
    });
    contentRouter.post('/create', async function (req, res, next) {
        const JSONBody = req.body;
        const ccDto = new CreateContentRequestDto();
        ccDto.name = JSONBody.name;
        ccDto.displayName = JSONBody.displayName;
        ccDto.summary = JSONBody.summary;
        ccDto.content = JSONBody.content;
        ccDto.published = JSONBody.published;
        res.send(await instance.create(ccDto));
    });
    contentRouter.patch('/update', async function (req, res, next) {
        io.emit('PATCH', req.body);
        const JSONBody = req.body;
        const ucDto = new UpdateContentRequestDto();
        ucDto.id = JSONBody.id;
        ucDto.name = JSONBody.name;
        ucDto.displayName = JSONBody.displayName;
        ucDto.summary = JSONBody.summary;
        ucDto.content = JSONBody.content;
        ucDto.published = JSONBody.published;
        res.send(await instance.patch(ucDto));
    });
}

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
    router(app, instance, io);
    app.get(`/`, function (req, res, next) {
        res.sendFile(path.join(__dirname, '/index.html'));
    });
    app.get("/socketScript.js", function (req, res, next) {
        res.sendFile(path.join(__dirname, '/socketScript.js'));
    });
    return server;
}

export function listen(app: any) {
    // noinspection HttpUrlsUsage
    log.info(`Server is up and running @ http://${serverSettings.host}:${serverSettings.port}`);
    app.listen(serverSettings.port);
}

export async function configureAndListen() {
    const app = createServer();
    listen(await app);
}
