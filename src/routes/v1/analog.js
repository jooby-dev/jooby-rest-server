import decode from '../../controllers/decoders/analog.js';
import encode from '../../controllers/encoders/analog.js';
import {validateDecoderRequest, validateEncoderRequest} from './utils/validateRequest.js';
import {modifyDecoderRequest, modifyEncoderRequest} from './utils/modifyRequest.js';


const resource = 'analog';

const validateAnalogDecoderRequest = ( request, reply, done ) => {
    validateDecoderRequest(request, reply);

    done();
};

const validateAnalogEncoderRequest = ( request, reply, done ) => {
    validateEncoderRequest(request, reply);

    done();
};


export default fastify => {
    fastify.post(
        `/decoder/${resource}`,
        {
            preValidation: [validateAnalogDecoderRequest],
            preHandler: [modifyDecoderRequest]
        },
        decode
    );

    fastify.post(
        `/encoder/${resource}`,
        {
            preValidation: [validateAnalogEncoderRequest],
            preHandler: [modifyEncoderRequest]
        },
        encode
    );
};
