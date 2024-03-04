import errors from '../../errors.js';
import {utils} from 'jooby-codec/index.js';


/**
 * @this fastify.FastifyInstance
 */
export default function encode ( {body}, reply ) {
    try {
        const {
            bytesConversionFormat,
            response
        } = body;

        response.response.data = utils.getStringFromBytes('01020304', bytesConversionFormat);

        reply.send(response);
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
