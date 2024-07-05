import {readFile} from 'node:fs/promises';

import axios from 'axios';
import fastifyPlugin from 'fastify-plugin';

import {integrations as config} from '../configs/main.js';
import adapters from '../adapters/integrations/index.js';


export default fastifyPlugin(async fastify => {
    let integrations;

    try {
        integrations = JSON.parse(await readFile(config.fileName, 'utf8'));
    } catch ( exception ) {
        fastify.log.fatal(exception);
        process.exit(1);
    }

    integrations.forEach(( {type, name} ) => {
        if ( !type ) {
            fastify.log.fatal(`Empty "type" field in integration ${name}`);
            process.exit(1);
        }

        if ( !adapters[type] ) {
            fastify.log.fatal(`Unknown "type" field in integration ${name}. Possible values: ${Object.keys(adapters)}`);
            process.exit(1);
        }
    });

    fastify.decorateReply('payload', null);

    fastify.addHook('onSend', async ( request, reply, payload ) => {
        // convert response payload from JSON to object
        reply.payload = JSON.parse(payload);
    });

    fastify.addHook('onResponse', async ( request, reply ) => {
        // find match
        integrations.forEach(integration => {
            if ( integration.protocol.toUpperCase() === 'HTTP' ) {
                if ( request.url.includes(integration.route) ) {
                    const payload = adapters[integration.type](reply.payload);

                    // post to the integration
                    axios.post(
                        integration.url,
                        payload,
                        {headers: integration.headers || {}}
                    )
                        .catch(error => fastify.log.warn(error));

                    fastify.log.info('integration %s: sent to %s %o', integration.name, integration.url, payload);
                }
            }
        });
    });
});
