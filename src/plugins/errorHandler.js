import fastifyPlugin from 'fastify-plugin';

import errors from '../errors.js';


const errorKeys = new Set(Object.keys(errors));


export default fastifyPlugin((fastify, options, done) => {
    fastify.setErrorHandler(async ( exception, request, reply ) => {
        fastify.log.error(exception);
        const isKnownError = errorKeys.has(exception?.body?.code);

        reply.sendError(isKnownError ? exception : errors.INTERNAL_SERVER_ERROR);
    });

    done();
});
