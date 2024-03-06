import * as baseRequest from './request.js';
import * as mtxRequest from './mtxRequest.js';
import * as mtxLoraRequest from './mtxLoraRequest.js';
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


export const validateDecoder = ( request, reply ) => {
    const {body: {protocol}} = request;

    if ( !validateGeneralRequest(protocol, reply) || !baseRequest.validateDecoder(request, reply) ) {
        return false;
    }

    if ( protocol.toUpperCase() === 'MTX' ) {
        return mtxRequest.validateDecoder(request, reply);
    }

    if ( protocol.toUpperCase() === 'MTXLORA' ) {
        return mtxLoraRequest.validateDecoder(request, reply);
    }

    return true;
};

export const validateEncoder = ( request, reply ) => {
    const {body: {protocol}} = request;

    if ( !validateGeneralRequest(protocol, reply) || !baseRequest.validateEncoder(request, reply) ) {
        return false;
    }

    if ( protocol.toUpperCase() === 'MTX' ) {
        return mtxRequest.validateEncoder(request, reply);
    }

    if ( protocol.toUpperCase() === 'MTXLORA' ) {
        return mtxLoraRequest.validateEncoder(request, reply);
    }

    return true;
};
