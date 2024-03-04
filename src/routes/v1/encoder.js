import encode from '../../controllers/encoders/general.js';
import {validateGeneralEncoderRequest} from './utils/validateGeneralRequest.js';
import {modifyEncoderRequest} from './utils/modifyRequest.js';


const validateRequest = ( request, reply, done ) => {
    validateGeneralEncoderRequest(request, reply);

    done();
};


export default fastify => {
    fastify.post(
        `/encoder`,
        {
            preValidation: [validateRequest],
            preHandler: [modifyEncoderRequest]
        },
        encode
    );
};
