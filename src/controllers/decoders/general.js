import analog from './analog.js';
import mtx from './mtx.js';
import mtxLora from './mtxLora.js';
import obisObserver from './obisObserver.js';


const decoders = {
    analog,
    mtx,
    mtxLora,
    obisObserver
};


/**
 * @this fastify.FastifyInstance
 */
export default function decode ( request, reply ) {
    const {body: {protocol}} = request;

    decoders[protocol](request, reply);
}
