import {validateDecoder} from './validators/general.js';
import {modifyDecoderRequest} from './utils/modifyRequest.js';
import decode from '../../controllers/decoders/general.js';
import adaptData from '../../adapters/ns/index.js';


export default fastify => {
    fastify.post(
        `/decoder`,
        {
            preValidation: [adaptData, validateDecoder],
            preHandler: [modifyDecoderRequest]
        },
        decode
    );
};
