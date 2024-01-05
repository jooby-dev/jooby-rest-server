import './setup.js';


import pino from 'pino';
import fastifyFactory from 'fastify';
import {pino as configPino} from './configs/main.js';
// plugins
import fastifyPrintRoutes from 'fastify-print-routes';
import errorHandler from './plugins/error.handler.js';

// reply plugins
import replySendError from './plugins/reply/send.error.js';

const levels = pino.levels.values;

let requestIndex = 1;

export default () => {
    const fastify = fastifyFactory({
        logger: {
            ...configPino,
            hooks: {
                logMethod ( args, method, level ) {
                    if ( fastify?.notify ) {
                        switch ( level ) {
                            case levels.error:
                                fastify.notify.error([...args]);
                                break;

                            case levels.fatal:
                                fastify.notify.fatal([...args]);
                                break;
                        }
                    }

                    return method.apply(this, args);
                }
            }
        },
        genReqId: () => requestIndex++
    });

    fastify.register(fastifyPrintRoutes, {useColors: configPino.transport.options.colorize});

    // custom plugins

    fastify.register(errorHandler);

    // reply decorators
    fastify.register(replySendError);

    fastify.after(async () => {
        // lazy load routes when user dictionaries already prepared
        fastify.register((await import('./routes/v1/index.js')).default, {prefix: 'v1'});
    });

    return fastify;
};
