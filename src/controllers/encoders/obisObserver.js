import {obisObserver, utils} from 'jooby-codec/index.js';
import {requestById, responseById} from 'jooby-codec/obis-observer/constants/commandRelations.js';
import * as Frame from 'jooby-codec/utils/frame.js';
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
            framingFormat,
            frame,
            bytesConversionFormat,
            response
        } = body;

        const {commands} = framingFormat === HDLC ? frame : body;

        let bytes = obisObserver.message.toBytes(commands.map(constructCommand));

        if ( framingFormat === HDLC ) {
            bytes = Frame.toFrame(bytes).bytes;
            response.frame.data = utils.getStringFromBytes(bytes, bytesConversionFormat);
        } else {
            response.data = utils.getStringFromBytes(bytes, bytesConversionFormat);
        }

        reply.send(response);
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
