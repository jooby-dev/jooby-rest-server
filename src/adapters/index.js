import chirpstack from './chirpstack.js';
import errors from '../errors.js';

const adapters = {
    chirpstack
};

// fastify force all headers in lowercase
const headerName = 'ns-adapter';


export default async function adaptData ( request, reply ) {
    const adapterName = request.headers[headerName];

    if ( !adapterName ) {
        // skip requests without data adaptation
        return true;
    }

    if ( !adapters[adapterName] ) {
        reply.sendError(errors.BAD_REQUEST, `Unsupported adapter "${adapterName}"`);

        return false;
    }

    const adapter = adapters[adapterName];
    const body = adapter(request, this.log);

    if ( body ) {
        // override request body
        request.body = body;
    } else {
        // nothing to response, all is ok, unsupported or bad request
        reply.send('ok');

        return false;
    }

    return true;
}
