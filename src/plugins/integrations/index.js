import {readFile} from 'node:fs/promises';

import axios from 'axios';
import fastifyPlugin from 'fastify-plugin';

import {integrations as config} from '../../configs/main.js';
import * as chirpstack from './chirpstack.js';


const specialSenders = {
    chirpstack
};

const sendData = async ( integration, payload ) => {
    if ( specialSenders[integration.type] ) {
        return specialSenders[integration.type].sendData(integration, payload);
    }

    return axios.post(
        integration.url,
        payload,
        {headers: integration.headers || {}}
    );
};


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
        integrations.forEach(async integration => {
            if ( integration.protocol.toUpperCase() === 'HTTP' ) {
                if ( request.url.includes(integration.route) ) {
                    // post to the integration
                    try {
                        await sendData(integration, reply.payload);
                        fastify.log.info('integration %s: sent to %s %s', integration.name, integration.url, reply.payload);
                    } catch ( error ) {
                        fastify.log.warn(error);
                    }
                }
            }
        });
    });
});
