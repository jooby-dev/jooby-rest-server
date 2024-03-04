import decode from '../../controllers/decoders/general.js';
import {validateGeneralDecoderRequest} from './utils/validateGeneralRequest.js';
import {modifyDecoderRequest} from './utils/modifyRequest.js';


const validateRequest = ( request, reply, done ) => {
    validateGeneralDecoderRequest(request, reply);

    done();
};


export default fastify => {
    fastify.post(
        `/decoder`,
        {
            preValidation: [validateRequest],
            preHandler: [modifyDecoderRequest]
        },
        decode
    );
};
