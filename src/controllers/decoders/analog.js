import {decodeAnalogMessage} from './utils/decodeAnalogMessage.js';
import {HDLC} from '../../constants/framingFormats.js';
import decodeFrames from './utils/decodeFrames.js';
import {prepareCommands, prepareFrame} from '../utils/prepareCommands.js';
import errors from '../../errors.js';


const decodeMessage = ( bytes, options ) => {
    const {bytesConversionFormat} = options;
    const {isValid, commands} = decodeAnalogMessage(bytes, options);

    return {
        isValid,
        commands: prepareCommands(commands, bytesConversionFormat)
    };
};

const decodeFrame = ( frame, options ) => {
    const {bytesConversionFormat} = options;
    const message = decodeMessage(frame.content, options);

    return {
        ...prepareFrame(frame, bytesConversionFormat),
        message
    };
};


/**
 * @this fastify.FastifyInstance
 */
export default function decode ( request, reply ) {
    const {body} = request;
    const {
        bytes,
        framingFormat,
        response
    } = body;

    try {
        const result = framingFormat === HDLC
            ? {frames: decodeFrames(body).map(frame => decodeFrame(frame, body))}
            : {message: decodeMessage(bytes, body)};

        reply.send({
            protocol: 'analog',
            ...response,
            ...result
        });
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
