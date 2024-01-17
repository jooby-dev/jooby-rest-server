import {directions} from '../../../externals/joobyCodec.js';
import errors from '../../../errors.js';


const directionTypes = new Set(Object.keys(directions));

const isRequestValid = ( {data, direction} ) => (typeof data === 'string')
    && (!direction || ((typeof direction === 'string') && directionTypes.has(direction.toUpperCase())));


export default ( {body}, reply, done ) => {
    if ( !isRequestValid(body) ) {
        reply.sendError(errors.BAD_REQUEST);
    }

    done();
};
