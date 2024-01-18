import {analog, directions} from '../../../externals/joobyCodec.js';
import errors from '../../../errors.js';


const directionTypes = new Set(Object.keys(directions));
const hardwareTypes = new Set(Object.keys(analog.constants.hardwareTypes));

const isRequestValid = ( {data, direction, hardwareType} ) => (typeof data === 'string')
    && (!direction || ((typeof direction === 'string') && directionTypes.has(direction.toUpperCase())))
    && (!hardwareType || !hardwareTypes.has(hardwareType));


export default ( {body}, reply, done ) => {
    if ( !isRequestValid(body) ) {
        reply.sendError(errors.BAD_REQUEST);
    }

    done();
};
