import decode from '../../controllers/decoders/mtxLora.js';
import encode from '../../controllers/encoders/mtxLora.js';
import {validateMtxLoraEncoderRequest, validateMtxLoraDecoderRequest} from './utils/validateMtxLoraRequest.js';
import {modifyDecoderRequest, modifyEncoderRequest} from './utils/modifyRequest.js';


const resource = 'mtxLora';

const validateDecoderRequest = ( request, reply, done ) => {
    validateMtxLoraDecoderRequest(request, reply);

    done();
};

const validateEncoderRequest = ( request, reply, done ) => {
    validateMtxLoraEncoderRequest(request, reply, done);

    done();
};


export default fastify => {
    fastify.post(
        `/decoder/${resource}`,
        {
            preValidation: [validateDecoderRequest],
            preHandler: [modifyDecoderRequest]
        },
        decode
    );

    fastify.post(
        `/encoder/${resource}`,
        {
            preValidation: [validateEncoderRequest],
            preHandler: [modifyEncoderRequest]
        },
        encode
    );
};
