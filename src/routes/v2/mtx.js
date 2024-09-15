import {validateDecoder, validateEncoder} from './validators/mtx.js';
import {modifyDecoderRequest, modifyEncoderRequest} from './utils/modifyRequest.js';
import decode from '../../controllers/decoders/mtx.js';
import encode from '../../controllers/encoders/mtx.js';
import adaptData from '../../adapters/index.js';
import {MTX1, MTX3} from '../../constants/protocols.js';


const registerRoute = ( fastify, protocol ) => {
    const addProtocolToBody = ( request, reply, done ) => {
        request.body.protocol = protocol;

        done();
    };

    fastify.post(
        `/decoder/${protocol}`,
        {
            preValidation: [
                adaptData,
                addProtocolToBody,
                validateDecoder
            ],
            preHandler: [modifyDecoderRequest]
        },
        decode
    );

    fastify.post(
        `/encoder/${protocol}`,
        {
            preValidation: [
                addProtocolToBody,
                validateEncoder
            ],
            preHandler: [modifyEncoderRequest]
        },
        encode
    );
};


export default fastify => {
    registerRoute(fastify, MTX1);
    registerRoute(fastify, MTX3);
};
