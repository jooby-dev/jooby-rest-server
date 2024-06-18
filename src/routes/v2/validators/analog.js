import {analog} from '@jooby-dev/jooby-codec/index.js';
import * as baseRequest from './common.js';
import errors from '../../../errors.js';
import * as directions from '../../../constants/directions.js';


const hardwareTypesSet = new Set(Object.values(analog.constants.hardwareTypes));


const checkCommonFields = ( request, reply ) => {
    const {direction, hardwareType} = request.body;

    if ( direction !== directions.DOWNLINK && direction !== directions.UPLINK ) {
        reply.sendError(errors.BAD_REQUEST, 'Invalid direction value');

        return false;
    }

    if ( hardwareType && !hardwareTypesSet.has(hardwareType) ) {
        reply.sendError(errors.BAD_REQUEST, `Wrong hardware type value. ${hardwareType}`);

        return false;
    }

    return true;
};

const checkDecoder = ( request, reply ) => {
    if ( !baseRequest.validateDecoder(request, reply) ) {
        return;
    }

    checkCommonFields(request, reply);
};


export const validateDecoder = ( request, reply, done ) => {
    checkDecoder(request, reply);

    done();
};


const checkEncoder = ( request, reply ) => {
    if ( !baseRequest.validateEncoder(request, reply) ) {
        return;
    }

    if ( !checkCommonFields(request, reply) ) {
        return;
    }

    if ( !request.body.commands ) {
        reply.sendError(errors.BAD_REQUEST, 'Commands not found');
    }
};


export const validateEncoder = ( request, reply, done ) => {
    checkEncoder(request, reply);

    done();
};
