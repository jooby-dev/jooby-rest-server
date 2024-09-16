import * as protocols from '../../constants/protocols.js';

import analog from './analog.js';
import mtx from './mtx.js';
import obisObserver from './obisObserver.js';


const decoders = {
    analog,
    mtx,
    obisObserver
};


/**
 * @this fastify.FastifyInstance
 */
export default function decode ( request, reply ) {
    const {body: {protocol}} = request;

    decoders[protocol === protocols.MTX1 || protocol === protocols.MTX3 ? 'mtx' : protocol](request, reply);
}
