import {getBoolean} from '../utils/environment.js';

export default {
    level: process.env.LOG_LEVEL || 'info',
    transport: {
        target: 'pino-pretty',
        options: {
            ignore: 'pid,hostname,req.req.hostname,req.req.remoteAddress,req.req.remotePort',
            colorize: getBoolean('LOG_ENABLE_COLORIZE', true),
            translateTime: 'yyyy.mm.dd HH:MM:ss.l'
        }
    }
};
