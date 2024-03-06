import decode from '../../controllers/decoders/mtxLora.js';
import encode from '../../controllers/encoders/mtxLora.js';
import * as mtxLoraRequest from './utils/mtxLoraRequest.js';
import {modifyDecoderRequest, modifyEncoderRequest} from './utils/modifyRequest.js';


const resource = 'mtxLora';

const validateDecoderRequest = ( request, reply, done ) => {
    mtxLoraRequest.validateDecoder(request, reply);

    done();
};

const validateEncoderRequest = ( request, reply, done ) => {
    mtxLoraRequest.validateEncoder(request, reply, done);

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
