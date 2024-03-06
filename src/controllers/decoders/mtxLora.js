import {decodeAnalogMessage} from './utils/decodeAnalogMessage.js';
import {analog, mtxLora, utils} from '@jooby-dev/jooby-codec/index.js';
import {prepareCommands} from '../utils/preparations.js';
import errors from '../../errors.js';


const processMtxBuffer = ( data, options ) => {
    const {messageId, accessLevel, commands} = mtxLora.message.fromBytes(data, options);

    return {
        messageId,
        accessLevel,
        commands: prepareCommands(commands, options)
    };
};

/**
 * @this fastify.FastifyInstance
 */
export default function decode ( {body}, reply ) {
    const {bytes, bytesConversionFormat, response} = body;
    const mtxMessages = [];

    try {
        const {
            isValid,
            commands,
            assembledData
        } = decodeAnalogMessage(bytes, {...body, hardwareType: analog.constants.hardwareTypes.MTXLORA});

        for ( let index = 0; index < assembledData?.length; index++ ) {
            const mtxBuffer = assembledData[index];

            if ( mtxBuffer.length !== 0 ) {
                const mtxMessage = processMtxBuffer(mtxBuffer.data, body);

                if ( mtxMessage ) {
                    mtxMessages.push({
                        segmentationSessionId: mtxBuffer.segmentationSessionId,
                        data: utils.getStringFromBytes(mtxBuffer.data, {bytesConversionFormat}),
                        ...mtxMessage
                    });
                }
            }
        }

        const message = {
            isValid,
            commands: prepareCommands(commands, {bytesConversionFormat})
        };

        const assembledMessages = mtxMessages?.length === 0 ? undefined : mtxMessages;

        reply.send({
            ...response,
            message,
            assembledMessages
        });
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
