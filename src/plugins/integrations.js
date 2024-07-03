import {readFile} from 'node:fs/promises';

import axios from 'axios';
import fastifyPlugin from 'fastify-plugin';

import {integrations as config} from '../configs/main.js';
import * as chirpstack from '../adapters/chirpstack.js';


// fastify force all headers in lowercase
const headerName = 'ns-adapter';


const adapters = {
    chirpstack: {
        default: chirpstack.default,
        thingsboard: chirpstack.thingsboard
    }
};


export default fastifyPlugin(async fastify => {
    let integrations;

    try {
        integrations = JSON.parse(await readFile(config.fileName, 'utf8'));
    } catch ( exception ) {
        fastify.log.fatal(exception);
        process.exit(1);
    }

    fastify.decorateRequest('adapter', null);
    fastify.decorateRequest('adapterData', null);
    fastify.decorateReply('payload', null);

    fastify.addHook('preValidation', async request => {
        // Some code
        const adapterName = request.headers[headerName];

        if ( adapterName && adapters[adapterName] ) {
            const adapter = adapters[adapterName].default;

            try {
                const body = adapter(request, fastify.log);

                if ( !body ) {
                    return;
                }

                request.adapterData = request.body;
                request.body = body;
                request.adapter = adapterName;
            } catch ( error ) {
                fastify.log.warn(error);
            }
        }
    });

    fastify.addHook('onSend', async ( request, reply, payload ) => {
        reply.payload = payload;
    });

    fastify.addHook('onResponse', async ( request, reply ) => {
        // find match
        integrations.forEach(integration => {
            if ( integration.protocol.toUpperCase() === 'HTTP' ) {
                if ( request.url.includes(integration.route) && request.adapter ) {
                    const nsAdapter = adapters[request.adapter];

                    if ( !nsAdapter ) {
                        return;
                    }

                    const integrationAdapter = nsAdapter[integration.type];

                    if ( !integrationAdapter ) {
                        return;
                    }

                    const payload = integrationAdapter(request.adapterData, reply.payload);

                    if ( !payload ) {
                        return;
                    }

                    // post to the integration
                    axios.post(
                        integration.url,
                        payload,
                        {headers: integration.headers || {}}
                    )
                        .then(response => fastify.log.info(response))
                        .catch(error => fastify.log.warn(error));

                    fastify.log.info('integration %s: sent to %s %o', integration.name, integration.url, reply.payload);
                }
            }
        });
    });
});
