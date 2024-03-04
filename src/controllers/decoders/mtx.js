import {mtx} from '@jooby-dev/jooby-codec/index.js';
import CommandBinaryBuffer from '@jooby-dev/jooby-codec/mtx/CommandBinaryBuffer.js';
import decodeFrames from './utils/decodeFrames.js';
import {HDLC} from '../../constants/framingFormats.js';
import {prepareCommands, prepareFrame} from '../utils/prepareCommands.js';
import errors from '../../errors.js';


const decodeMessage = ( bytes, options ) => {
    const {aesKeyBytes} = options;
    const {
        messageId,
        accessLevel,
        commands
    } = mtx.message.fromBytes(bytes, {...options, aesKey: aesKeyBytes});

    return {
        messageId,
        accessLevel,
        commands: prepareCommands(commands, options.bytesConversionFormat)
    };
};

const decodeFrame = ( frame, options ) => {
    const buffer = new CommandBinaryBuffer(frame.content);
    const header = buffer.getFrameHeader();

    return {
        ...prepareFrame(frame, options.bytesConversionFormat),
        ...header,
        ...decodeMessage(buffer.getBytesLeft(), options)
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
            ? {frames: decodeFrames(body).map(frame => decodeFrame(frame, body))}
            : {message: decodeMessage(bytes, body)};

        reply.send({
            protocol: 'mtx',
            ...response,
            ...result
        });
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
