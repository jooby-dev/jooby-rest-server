import {downlink, uplink} from 'jooby-codec/mtx1/message/index.js';
import * as frame from 'jooby-codec/mtx1/utils/frame.js';
import {accessLevels} from 'jooby-codec/mtx1/constants/index.js';
import {HDLC} from '../../constants/framingFormats.js';
import * as directions from '../../constants/directions.js';
import encodeAnalogDataSegments from './utils/encodeAnalogDataSegments.js';
import getStringFromBytes from '../../utils/getStringFromBytes.js';
import errors from '../../errors.js';


/**
 * @this fastify.FastifyInstance
 */
export default function encode ( {body}, reply ) {
    try {
        const {
            message: {id: messageId = 0, commands, accessLevel = accessLevels.UNENCRYPTED},
            direction,
            aesKeyBytes,
            header,
            framingFormat,
            response
        } = body;

        const bytes = direction === directions.DOWNLINK
            ? downlink.toBytes(commands, {messageId, accessLevel, aesKey: aesKeyBytes})
            : uplink.toBytes(commands, {messageId, accessLevel, aesKey: aesKeyBytes});

        reply.send({
            ...response,
            data: framingFormat === HDLC
                ? getStringFromBytes(frame.toBytes(bytes, header), body)
                : encodeAnalogDataSegments(bytes, body)
        });
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
