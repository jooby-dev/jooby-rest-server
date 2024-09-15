import * as constants from 'jooby-codec/constants/index.js';
import * as framingFormats from '../../../constants/framingFormats.js';
import * as directions from '../../../constants/directions.js';
import errors from '../../../errors.js';


const directionsSet = new Set(Object.values(directions));
const bytesConversionFormatsSet = new Set(Object.values(constants.bytesConversionFormats));
const framingTypesSet = new Set(Object.values(framingFormats));


const validateRequest = ( {body}, reply ) => {
    const {
        deviceEUI,
        direction,
        bytesConversionFormat,
        framingFormat
    } = body;

    if ( typeof deviceEUI !== 'string' ) {
        reply.sendError(errors.BAD_REQUEST, `Wrong deviceEUI value. ${deviceEUI}`);

        return false;
    }

    if ( direction && !directionsSet.has(direction) ) {
        reply.sendError(errors.BAD_REQUEST, `Wrong direction value. ${direction}`);

        return false;
    }

    if ( bytesConversionFormat && !bytesConversionFormatsSet.has(bytesConversionFormat) ) {
        reply.sendError(errors.BAD_REQUEST, `Wrong encoding format value. ${bytesConversionFormat}`);

        return false;
    }

    if ( framingFormat && !framingTypesSet.has(framingFormat) ) {
        reply.sendError(errors.BAD_REQUEST, `Wrong framing format value. ${framingFormat}`);

        return false;
    }

    return true;
};


export const validateDecoder = ( request, reply ) => {
    const {body: {data}} = request;

    if ( !validateRequest(request, reply) ) {
        return false;
    }

    if ( typeof data !== 'string' ) {
        reply.sendError(errors.BAD_REQUEST, 'The data field should be string');

        return false;
    }

    return true;
};

export const validateEncoder = validateRequest;
