import {decodeAnalogMessage} from './utils/decodeAnalogMessage.js';
import {fromBytes as frameFromBytes} from '@jooby-dev/jooby-codec/utils/frame.js';
import decodeFrames from './utils/decodeFrames.js';
import {HDLC} from '../../constants/framingFormats.js';
import getStringFromBytes from '../../utils/getStringFromBytes.js';
import errors from '../../errors.js';


const decodeMessage = ( bytes, options ) => {
    const {payload, ...message} = decodeAnalogMessage(bytes, options);

    return message;
};

const prepareFrame = ( {bytes, payload}, options ) => ({
    data: getStringFromBytes(bytes, options),
    ...(payload && {payload: getStringFromBytes(payload, options)})
});

const processErrorFrame = ( {error, frame}, options ) => ({
    error,
    frame: prepareFrame(frame, options)
});

const decodeFrame = ( bytes, options ) => {
    const frame = frameFromBytes(bytes);

    if ( frame.error ) {
        return processErrorFrame(frame, options);
    }

    const preparedFrame = prepareFrame(frame, options);

    return preparedFrame.payload
        ? {...preparedFrame, ...decodeMessage(frame.payload, options)}
        : preparedFrame;
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
            : decodeMessage(bytes, body);

        reply.send({
            ...response,
            ...result
        });
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
