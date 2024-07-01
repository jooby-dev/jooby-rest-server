import './setup.js';

import {readFile} from 'fs/promises';
import fastifyFactory from 'fastify';
import axios from 'axios';

import {pino as configPino, http as configHTTP, integrations as configIntegrations} from './configs/main.js';

// plugins
import fastifyPrintRoutes from 'fastify-print-routes';
import errorHandler from './plugins/errorHandler.js';
import validateApiKey from './plugins/validateApiKey.js';

// reply plugins
import replySendError from './plugins/reply/sendError.js';

import initRoutes from './routes/v2/index.js';
import {stopCollectorsCleaner} from './controllers/utils/collectorsCleaner.js';


export const getFastify = async () => {
    const integrations = JSON.parse(await readFile(configIntegrations.fileName, 'utf8'));
    let requestIndex = 1;

    const fastify = fastifyFactory({
        logger: {...configPino},
        genReqId: () => requestIndex++
    });

    fastify.register(fastifyPrintRoutes, {useColors: configPino.transport.options.colorize});

    // custom plugins
    fastify.register(errorHandler);
    fastify.register(validateApiKey);

    // reply decorators
    fastify.register(replySendError);

    fastify.register(initRoutes, {prefix: 'v2'});

    // Run the server!
    fastify
        .listen(configHTTP)
        .catch(error => {
            console.error('Error starting server:', error);
            process.exit(1);
        });

    fastify.addHook('onClose', async () => {
        stopCollectorsCleaner();
    });

    fastify.addHook('onSend', async ( request, reply, payload ) => {
        // need to save it for later
        reply.payload = reply.payload || payload;
    });

    fastify.addHook('onResponse', async ( request, reply ) => {
        // find match
        integrations.forEach(integration => {
            if ( integration.type.toUpperCase() === 'HTTP' ) {
                if ( request.url.includes(integration.route) ) {
                    // post to the integration
                    axios.post(
                        integration.url,
                        reply.payload,
                        {headers: integration.headers || {}}
                    )
                        .then(response => fastify.log.info(response))
                        .catch(error => fastify.log.warn(error));

                    fastify.log.info('integration %s: sent to %s %j', integration.name, integration.url, reply.payload);
                }
            }
        });
    });

    return fastify;
};
