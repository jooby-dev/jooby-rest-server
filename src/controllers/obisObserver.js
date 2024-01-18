import {obisObserver} from '../externals/joobyCodec.js';
import commonDecode from './utils/commonDecode.js';


/**
 * @this fastify.FastifyInstance
 */
export async function decode ( request, reply ) {
    commonDecode(obisObserver, request, reply);
}
