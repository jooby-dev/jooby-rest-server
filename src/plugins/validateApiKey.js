import fastifyPlugin from 'fastify-plugin';

import {auth} from '../configs/main.js';
import errors from '../errors.js';


// fastify force all headers in lowercase
const headerName = 'api_key';
const error = errors.BAD_REQUEST;

const checkHeader = request => {
    const {headers} = request;

    if ( !headers[headerName] ) {
        return false;
    }

    if ( request.headers[headerName] === auth.apiKey ) {
        return true;
    }

    return false;
};


export default fastifyPlugin((fastify, options, done) => {
    // if `API_KEY` is set - all requests will be validated with that value
    if ( auth.apiKey !== undefined ) {
        fastify.addHook('onRequest', ( request, reply ) => {
            // Some code
            if ( !checkHeader(request) ) {
                reply.status(error.code).send(error.body.message);
            }
        });
    }

    done();
});
