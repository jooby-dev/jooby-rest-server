import * as mtx1 from 'jooby-codec/mtx1/message/index.js';
import * as mtx3 from 'jooby-codec/mtx3/message/index.js';
import {downlinkById, uplinkById} from 'jooby-codec/mtx1/commands/index.js';
import {fromBytes as frameFromBytes} from 'jooby-codec/mtx1/utils/frame.js';
import {MTXLORA} from 'jooby-codec/analog/constants/hardwareTypes.js';
import {decodeAnalogMessage} from './utils/decodeAnalogMessage.js';
import decodeFrames from './utils/decodeFrames.js';
import {HDLC} from '../../constants/framingFormats.js';
import {prepareCommands} from '../utils/preparations.js';
import * as protocols from '../../constants/protocols.js';
import getStringFromBytes from '../../utils/getStringFromBytes.js';
import errors from '../../errors.js';
import * as directions from '../../constants/directions.js';


const fromBytes = ( bytes, options ) => {
    const message = options.protocol === protocols.MTX1 ? mtx1 : mtx3;

    return options.direction === directions.DOWNLINK ? message.downlink.fromBytes(bytes, options) : message.uplink.fromBytes(bytes, options);
};

const prepareMtxCommands = ( commands, options ) => (
    prepareCommands(
        options.direction === directions.DOWNLINK ? downlinkById : uplinkById,
        commands,
        options
    ));

const prepareMessage = ( {messageId: id, accessLevel, commands}, options ) => ({
    id,
    accessLevel,
    commands: prepareMtxCommands(commands, options)
});

const prepareErrorMessage = ( {error, message}, options ) => ({
    error,
    message: prepareMessage(message, options)
});

const decodeMessage = ( bytes, options ) => {
    const {aesKeyBytes} = options;
    const message = fromBytes(bytes, {...options, aesKey: aesKeyBytes});

    return message.error
        ? {invalidMessage: prepareErrorMessage(message, options)}
        : {message: prepareMessage(message, options)};
};

const prepareFrame = ( {header, bytes, payload}, options ) => ({
    data: getStringFromBytes(bytes, options),
    ...(header && {header}),
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

const decodeLoraMessage = body => {
    const {bytes} = body;
    const assembledMessages = [];

    const {
        commands,
        payload
    } = decodeAnalogMessage(bytes, {...body, hardwareType: MTXLORA});

    for ( let index = 0; index < payload?.length; index++ ) {
        const mtxBuffer = payload[index];

        if ( mtxBuffer.length !== 0 ) {
            const mtxMessage = decodeMessage(mtxBuffer.data, body);

            if ( mtxMessage ) {
                assembledMessages.push({
                    segmentationSessionId: mtxBuffer.segmentationSessionId,
                    data: getStringFromBytes(mtxBuffer.data, body),
                    ...mtxMessage
                });
            }
        }
    }

    return assembledMessages.length === 0 ? {commands} : {commands, assembledMessages};
};


/**
 * @this fastify.FastifyInstance
 */
export default function decode ( {body}, reply ) {
    const {
        framingFormat,
        response
    } = body;

    try {
        const result = framingFormat === HDLC
            ? {frames: decodeFrames(body).map(frame => decodeFrame(frame, body))}
            : decodeLoraMessage(body);

        reply.send({
            ...response,
            ...result
        });
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
