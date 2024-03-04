import {mtx, utils} from '@jooby-dev/jooby-codec/index.js';
import {requestById, responseById} from '@jooby-dev/jooby-codec/mtx/constants/commandRelations.js';
import {HDLC} from '../../constants/framingFormats.js';
import errors from '../../errors.js';

const constructCommand = command => {
    const constructor = requestById.get(command.id) || responseById.get(command.id);

    return new constructor(command);
};


/**
 * @this fastify.FastifyInstance
 */
export default function encode ( {body}, reply ) {
    try {
        const {
            accessLevel,
            aesKeyBytes,
            framingFormat,
            frame,
            bytesConversionFormat,
            response
        } = body;

        const {commands, messageId} = framingFormat === HDLC ? frame : body;

        let bytes = mtx.message.toBytes(commands.map(constructCommand), {messageId, accessLevel, aesKey: aesKeyBytes});

        if ( framingFormat === HDLC ) {
            bytes = mtx.message.toFrame(bytes, frame);
            response.frame.data = utils.getStringFromBytes(bytes, bytesConversionFormat);
        } else {
            response.data = utils.getStringFromBytes(bytes, bytesConversionFormat);
        }

        reply.send(response);
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
