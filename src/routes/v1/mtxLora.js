import decode from '../../controllers/decoders/mtxLora.js';
import {validateDecoderRequest} from './utils/validateDecoderRequest.js';

const resource = '/mtx-lora';


export default fastify => {
    fastify.post(
        `${resource}/decoder`,
        {
            preValidation: [validateDecoderRequest]
        },
        decode
    );
};
