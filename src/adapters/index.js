import * as chirpstack from './chirpstack.js';
import errors from '../errors.js';

const adapters = {
    chirpstack
};

// fastify force all headers in lowercase
const headerName = 'ns-adapter';


export default function adaptData ( request, reply ) {
    const adapterName = request.headers[headerName];

    if ( !adapterName && adapters[adapterName] ) {
        reply.sendError(errors.BAD_REQUEST, `Unsupported adapter "${adapterName}"`);

        return false;
    }

    const adapter = adapters[adapterName];
    const body = adapter(request, this.log);

    if ( !body ) {
        // ignore untransformed data
        return true;
    }

    return true;
}
