import {decode} from '../../controllers/obisObserver.js';
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
