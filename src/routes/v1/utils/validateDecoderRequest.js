import {analog} from 'jooby-codec/index.js';
import * as directions from 'jooby-codec/constants/directions.js';
import errors from '../../../errors.js';


const directionTypes = new Set(Object.keys(directions));
const hardwareTypes = new Set(Object.keys(analog.constants.hardwareTypes));

const isRequestValid = ( {data, direction, hardwareType} ) => (typeof data === 'string')
    && (!direction || ((typeof direction === 'string') && directionTypes.has(direction.toUpperCase())))
    && (!hardwareType || !hardwareTypes.has(hardwareType));


export const validateDecoderRequest = ( {body}, reply, done ) => {
    if ( !isRequestValid(body) ) {
        reply.sendError(errors.BAD_REQUEST);
    }

    done();
};
