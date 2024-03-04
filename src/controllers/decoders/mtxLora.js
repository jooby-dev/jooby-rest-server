import {analog, mtx, mtxLora, utils} from 'jooby-codec/index.js';
import * as directions from 'jooby-codec/constants/directions.js';
import DataSegment from 'jooby-codec/analog/commands/DataSegmentBase.js';
import {getSegmentCollector, removeSegmentCollector} from '../utils/segmentCollectors.js';
import UnknownCommand from 'jooby-codec/mtxLora/UnknownCommand.js';
import {prepareCommand, prepareCommands} from '../utils/prepareCommands.js';
import codecsNames from '../utils/codecsNames.js';
import errors from '../../errors.js';


const prepareMtxMessage = ( codecName, {messageId, accessLevel, commands} ) => ({
    messageId,
    accessLevel,
    codec: codecName,
    commands: prepareCommands(commands)
});

const readMtxLoraMessage = ( data, options ) => {
    const message = mtxLora.message.fromBytes(data, options);

    if ( !message.commands.some(({command}) => command instanceof UnknownCommand) ) {
        return prepareMtxMessage(codecsNames.get(mtxLora), message);
    }

    return null;
};

const readMtxMessage = ( data, options ) => {
    const message = mtx.message.fromBytes(data, {...options, skipLrcCheck: true});

    return prepareMtxMessage(codecsNames.get(mtx), message);
};

const processMtxBuffer = ( buffer, options ) => {
    const message = readMtxLoraMessage(buffer, options) || readMtxMessage(buffer, options);

    if ( message ) {
        message.isValid = true;
        message.data = utils.getBase64FromBytes(buffer);
    }

    return message;
};


/**
 * @this fastify.FastifyInstance
 */
export default async function decode ( request, reply ) {
    const {message} = analog;
    const {deviceEUI, data} = request.body;
    const analogCommands = [];
    let mtxMessage;

    // eslint-disable-next-line import/namespace
    const direction = directions ? directions[request.body.direction.toUpperCase()] : undefined;

    try {
        const {commands, isValid} = message.fromBase64(
            data,
            {direction, hardwareType: analog.constants.hardwareTypes.MTXLORA}
        );

        for ( let index = 0; index < commands.length; index++ ) {
            const {command} = commands[index];

            if ( command instanceof DataSegment ) {
                const collector = getSegmentCollector(deviceEUI);
                const dataSegment = {...command.parameters, data: new Uint8Array(command.parameters.data)};
                const mtxBuffer = collector.push(dataSegment);

                command.parameters.data = utils.getBase64FromBytes(command.parameters.data);

                if ( mtxBuffer.length !== 0 ) {
                    mtxMessage = processMtxBuffer(mtxBuffer, {direction}) || {};
                    mtxMessage.segmentationSessionId = dataSegment.segmentationSessionId;
                    mtxMessage.deviceEUI = deviceEUI;
                    removeSegmentCollector(deviceEUI);
                }
            }

            analogCommands.push(prepareCommand(command));
        }

        const result = [{
            isValid,
            deviceEUI,
            data,
            codec: codecsNames.get(analog),
            commands: analogCommands
        }];

        if ( mtxMessage?.isValid ) {
            result.push(mtxMessage);
        }

        reply.send(result);
    } catch ( error ) {
        reply.sendError(errors.INTERNAL_SERVER_ERROR, error);
    }
}
