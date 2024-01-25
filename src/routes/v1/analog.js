import decode from '../../controllers/decoders/analog.js';
import {validateDecoderRequest} from './utils/validateDecoderRequest.js';


const resource = '/analog';


export default fastify => {
    fastify.post(
        `${resource}/decoder`,
        {
            preValidation: [validateDecoderRequest]
        },
        decode
    );
};
