import {validateEncoderRequest, validateDecoderRequest} from './validateRequest.js';
import {validateMtxAesDecoderParameters, validateMtxAesEncoderParameters} from './validateMtxAesParameters.js';
import errors from '../../../errors.js';


export const validateMtxLoraDecoderRequest = ( request, reply ) => (
    validateDecoderRequest(request, reply) || !validateMtxAesDecoderParameters(request, reply)
);

export const validateMtxLoraEncoderRequest = ( request, reply ) => {
    const {body} = request;
    const {messageId, segmentationSessionId} = body;

    if ( !validateEncoderRequest(request, reply) || !validateMtxAesEncoderParameters(request, reply) ) {
        return false;
    }

    if ( !messageId ) {
        reply.sendError(errors.BAD_REQUEST, 'Message id not found');

        return false;
    }

    if ( !segmentationSessionId ) {
        reply.sendError(errors.BAD_REQUEST, 'Segmentation session id not found');

        return false;
    }

    return true;
};
