import {analog, mtxLora, utils} from 'jooby-codec/index.js';
import {splitBytesToDataSegments} from 'jooby-codec/analog/splitBytesToDataSegments.js';
import {requestById as mtxRequestById, responseById as mtxResponseById} from 'jooby-codec/mtx/constants/commandRelations.js';
import {requestById as mtxLoraRequestById, responseById as mtxLoraResponseById} from 'jooby-codec/mtxLora/constants/commandRelations.js';
import * as directions from 'jooby-codec/constants/directions.js';
import {accessLevels} from 'jooby-codec/mtx/constants/index.js';
import {HDLC} from '../../constants/framingFormats.js';
import errors from '../../errors.js';


const constructDownlinkMtxLoraCommands = commands => commands.map(command => {
    const constructor = mtxLoraRequestById.get(command.id);

    return constructor ? new constructor(command) : null;
});

const constructUplinkMtxLoraCommands = commands => commands.map(command => {
    const constructor = mtxLoraResponseById.get(command.id);

    return constructor ? new constructor(command) : null;
});

const constructDownlinkMtxCommands = commands => commands.map(command => {
    const constructor = mtxRequestById.get(command.id);

    return constructor ? new constructor(command) : null;
});

const constructUplinkMtxCommands = commands => commands.map(command => {
    const constructor = mtxResponseById.get(command.id);

    return constructor ? new constructor(command) : null;
});


/**
 * @this fastify.FastifyInstance
 */
export default function encode ( {body}, reply ) {
    try {
        const {
            commands,
            bytesConversionFormat,
            direction,
            framingFormat,
            messageId,
            response
        } = body;

        if ( framingFormat === HDLC ) {
            reply.sendError(errors.BAD_REQUEST, 'The HDLC framing format is not supported for the mtxLora');

            return;
        }

        let mtxCommands = direction === directions.UPLINK
            ? constructUplinkMtxLoraCommands(commands)
            : constructDownlinkMtxLoraCommands(commands);

        let accessLevel = accessLevels.UNENCRYPTED;

        if ( mtxCommands.some(command => command === null) ) {
            mtxCommands = direction === directions.UPLINK
                ? constructUplinkMtxCommands(commands)
                : constructDownlinkMtxCommands(commands);
            accessLevel = body.accessLevel;
        }

        const mtxBytes = mtxLora.message.toBytes(messageId, mtxCommands, {accessLevel, ...body});
        const dataSegmentCommands = splitBytesToDataSegments(mtxBytes, {maxSegmentSize: 50, ...body});

        const segmentBytes = dataSegmentCommands.map(
            dataSegmentCommand => (utils.getStringFromBytes(analog.message.toBytes([dataSegmentCommand]), bytesConversionFormat))
        );

        reply.send({
            ...response,
            segments: segmentBytes
        });
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
