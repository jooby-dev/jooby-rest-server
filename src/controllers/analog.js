import {analog} from '../externals/joobyCodec.js';
import commonDecode from './utils/decode.js';


/**
 * @this fastify.FastifyInstance
 */
export async function decode ( request, reply ) {
    commonDecode(analog, request, reply);
}
