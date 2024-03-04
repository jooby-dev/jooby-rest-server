import decode from '../../controllers/decoders/obisObserver.js';
import encode from '../../controllers/encoders/obisObserver.js';
import {validateDecoderRequest, validateEncoderRequest} from './utils/validateRequest.js';
import {modifyDecoderRequest, modifyEncoderRequest} from './utils/modifyRequest.js';


const resource = 'obisObserver';

const validateObisObserverDecoderRequest = ( request, reply, done ) => {
    validateDecoderRequest(request, reply);

    done();
};

const validateObisObserverEncoderRequest = ( request, reply, done ) => {
    validateEncoderRequest(request, reply);

    done();
};


export default fastify => {
    fastify.post(
        `/decoder/${resource}`,
        {
            preValidation: [validateObisObserverDecoderRequest],
            preHandler: [modifyDecoderRequest]
        },
        decode
    );

    fastify.post(
        `/encoder/${resource}`,
        {
            preValidation: [validateObisObserverEncoderRequest],
            preHandler: [modifyEncoderRequest]
        },
        encode
    );
};
