import getEnvBoolean from '../utils/get.env.boolean.js';

export default {
    level: process.env.LOG_LEVEL || 'info',
    transport: {
        target: 'pino-pretty',
        options: {
            ignore: 'pid,hostname,req.req.hostname,req.req.remoteAddress,req.req.remotePort',
            colorize: getEnvBoolean('LOG_ENABLE_COLORIZE', true),
            translateTime: 'yyyy.mm.dd HH:MM:ss.l'
        }
    }
};
