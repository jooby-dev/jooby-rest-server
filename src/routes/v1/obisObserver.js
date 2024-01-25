import decode from '../../controllers/decoders/obisObserver.js';
import {validateDecoderRequest} from './utils/validateDecoderRequest.js';


const resource = '/obis-observer';


export default fastify => {
    fastify.post(
        `${resource}/decoder`,
        {
            preValidation: [validateDecoderRequest]
        },
        decode
    );
};
