import {obisObserver} from 'jooby-codec/index.js';
import commonDecode from '../utils/commonDecode.js';


/**
 * @this fastify.FastifyInstance
 */
export default async function decode ( request, reply ) {
    commonDecode(obisObserver, request, reply);
}
