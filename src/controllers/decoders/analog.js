import {analog} from '../externals/joobyCodec.js';
import commonDecode from './utils/commonDecode.js';


/**
 * @this fastify.FastifyInstance
 */
export async function decode ( request, reply ) {
    commonDecode(analog, request, reply);
}
