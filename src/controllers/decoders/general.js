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

    if ( decoders[protocol] ) {
        decoders[protocol](request, reply);
    } else {
        this.log.warn('unknown protocol %s', protocol);
        // unknown protocol, all is ok, added for integrations
        reply.send('ok');
    }
}
