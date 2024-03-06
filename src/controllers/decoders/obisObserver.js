import {obisObserver} from '@jooby-dev/jooby-codec/index.js';
import decodeFrames from './utils/decodeFrames.js';
import {HDLC} from '../../constants/framingFormats.js';
import {prepareCommands, prepareFrame} from '../utils/preparations.js';
import errors from '../../errors.js';


const decodeMessage = ( bytes, options ) => {
    const {commands} = obisObserver.message.fromBytes(bytes, options);

    return prepareCommands(commands, options);
};

const decodeFrame = ( frame, options ) => {
    const commands = decodeMessage(frame.content, options);

    return {
        ...prepareFrame(frame, options),
        commands
    };
};


/**
 * @this fastify.FastifyInstance
 */
export default function decode ( {body}, reply ) {
    const {
        bytes,
        framingFormat,
        response
    } = body;

    try {
        const result = framingFormat === HDLC
            ? {frames: decodeFrames(body, 7).map(frame => decodeFrame(frame, body))}
            : {commands: decodeMessage(bytes, body)};

        reply.send({
            ...response,
            ...result
        });
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
