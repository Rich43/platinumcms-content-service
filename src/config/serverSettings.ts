import config from 'config';

export const serverSettings = {
    name: config.get<string>('name'),
    host: config.get<string>('host'),
    port: config.get<number>('port'),
    context: config.get<string>('context'),
    logLevel: config.get<string[]>('logLevel'),
};
