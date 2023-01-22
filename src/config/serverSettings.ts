import config from 'config';

export const serverSettings = {
    name: config.get('name'),
    host: config.get('host'),
    port: config.get('port'),
    context: config.get('context'),
    logLevel: config.get('logLevel'),
};
