import * as messages from 'jooby-codec/obis-observer/message/index.js';
import {downlinkById, uplinkById} from 'jooby-codec/obis-observer/commands/index.js';
import * as wrappers from 'jooby-codec/obis-observer/message/wrappers.js';
import {fromBytes as frameFromBytes} from 'jooby-codec/utils/frame.js';
import decodeFrames from './utils/decodeFrames.js';
import {HDLC} from '../../constants/framingFormats.js';
import {prepareCommands} from '../utils/preparations.js';
import getStringFromBytes from '../../utils/getStringFromBytes.js';
import errors from '../../errors.js';


const obisObserverFrameDataBits = 7;
const commandsById = {...downlinkById, ...uplinkById};

const fromBytes = wrappers.getFromBytes(
    {...messages.downlink.fromBytesMap, ...messages.uplink.fromBytesMap},
    {...messages.downlink.nameMap, ...messages.uplink.nameMap}
);

const decodeMessage = ( bytes, options ) => {
    const {commands} = fromBytes(bytes);

    return {commands: prepareCommands(commandsById, commands, options)};
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
    const frame = frameFromBytes(bytes, obisObserverFrameDataBits);

    if ( frame.error ) {
        return processErrorFrame(frame, options);
    }

    const preparedFrame = prepareFrame(frame, options);

    return frame.payload
        ? {...preparedFrame, ...decodeMessage(frame.payload, options)}
        : preparedFrame;
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
            : decodeMessage(bytes, body);

        reply.send({
            ...response,
            ...result
        });
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
