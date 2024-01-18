import {directions} from '../../externals/joobyCodec.js';
import {prepareCommands} from './prepareCommands.js';
import codecsNames from './codecsNames.js';
import errors from '../../errors.js';


/**
 * @this fastify.FastifyInstance
 */
export default function decode ( codec, request, reply ) {
    try {
        const {data, direction, hardwareType} = request.body;
        // eslint-disable-next-line import/namespace
        const directionId = direction ? directions[direction.toUpperCase()] : undefined;
        const {isValid, commands} = codec.message.fromBase64(data, {direction: directionId, hardwareType});

        reply.send({
            isValid,
            data,
            direction,
            codec: codecsNames.get(codec),
            hardwareType,
            commands: prepareCommands(commands)
        });
    } catch ( error ) {
        reply.sendError(errors.INTERNAL_SERVER_ERROR, error);
    }
}
