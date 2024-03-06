import * as baseRequest from './request.js';
import * as mtxAesParameters from './mtxAesParameters.js';
import errors from '../../../errors.js';


export const validateDecoder = ( request, reply ) => (
    baseRequest.validateDecoder(request, reply) || !mtxAesParameters.validateDecoder(request, reply)
);

export const validateEncoder = ( request, reply ) => {
    const {body} = request;
    const {messageId, segmentationSessionId} = body;

    if ( !baseRequest.validateEncoder(request, reply) || !mtxAesParameters.validateEncoder(request, reply) ) {
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
