import {validateDecoderRequest, validateEncoderRequest} from './validateRequest.js';
import {validateMtxDecoderRequest, validateMtxEncoderRequest} from './validateMtxRequest.js';
import {validateMtxLoraDecoderRequest, validateMtxLoraEncoderRequest} from './validateMtxLoraRequest.js';
import errors from '../../../errors.js';


const protocols = [
    'analog',
    'mtx',
    'mtxLora',
    'obisObserver'
];


const validateGeneralRequest = ( protocol, reply ) => {
    if ( !protocols.includes(protocol) ) {
        reply.sendError(errors.BAD_REQUEST, `Wrong protocol value. ${protocol}`);

        return false;
    }

    return true;
};


export const validateGeneralDecoderRequest = ( request, reply ) => {
    const {body: {protocol}} = request;

    if ( !validateGeneralRequest(protocol, reply) || !validateDecoderRequest(request, reply) ) {
        return false;
    }

    if ( protocol.toUpperCase() === 'MTX' ) {
        return validateMtxDecoderRequest(request, reply);
    }

    if ( protocol.toUpperCase() === 'MTXLORA' ) {
        return validateMtxLoraDecoderRequest(request, reply);
    }

    return true;
};

export const validateGeneralEncoderRequest = ( request, reply ) => {
    const {body: {protocol}} = request;

    if ( !validateGeneralRequest(protocol, reply) || !validateEncoderRequest(request, reply) ) {
        return false;
    }

    if ( protocol.toUpperCase() === 'MTX' ) {
        return validateMtxEncoderRequest(request, reply);
    }

    if ( protocol.toUpperCase() === 'MTXLORA' ) {
        return validateMtxLoraEncoderRequest(request, reply);
    }

    return true;
};
