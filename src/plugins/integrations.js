import {readFile} from 'node:fs/promises';

import axios from 'axios';
import fastifyPlugin from 'fastify-plugin';

import {integrations as config} from '../configs/main.js';


export default fastifyPlugin(async fastify => {
    let integrations;

    try {
        integrations = JSON.parse(await readFile(config.fileName, 'utf8'));
    } catch ( exception ) {
        fastify.log.fatal(exception);
        process.exit(1);
    }

    fastify.decorateReply('payload', null);

    fastify.addHook('onSend', async ( request, reply, payload ) => {
        reply.payload = payload;
    });

    fastify.addHook('onResponse', async ( request, reply ) => {
        // find match
        integrations.forEach(integration => {
            if ( integration.protocol.toUpperCase() === 'HTTP' ) {
                if ( request.url.includes(integration.route) ) {
                    // post to the integration
                    axios.post(
                        integration.url,
                        reply.payload,
                        {headers: integration.headers || {}}
                    )
                        .catch(error => fastify.log.warn(error));

                    fastify.log.info('integration %s: sent to %s %o', integration.name, integration.url, reply.payload);
                }
            }
        });
    });
});
