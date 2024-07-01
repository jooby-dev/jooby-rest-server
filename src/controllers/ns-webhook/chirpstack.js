import {analog, mtx, mtx3, obisObserver, utils} from '@jooby-dev/jooby-codec/index.js';
import {DOWNLINK, UPLINK} from '../../constants/directions.js';

import * as protocols from '../../constants/protocols.js';
import errors from '../../errors.js';


const eventMap = {
    txack: DOWNLINK,
    up: UPLINK
};

const messageDecoders = {
    [protocols.ANALOG]: ( {bytes, direction, hardwareType} ) => {
        if ( !hardwareType ) {
            throw new Error('hardwareType tag must be set in device profile');
        }

        // convert to number from string
        hardwareType = Number(hardwareType);

        return analog.message[direction].fromBytes(bytes, {hardwareType});
    },
    [protocols.MTX]: ( {bytes, direction} ) => (
        mtx.message[direction].fromBytes(bytes)
    ),
    [protocols.MTX3]: ( {bytes, direction} ) => (
        mtx3.message[direction].fromBytes(bytes)
    ),
    // in obis observer each command has unique id, no necessary to pass direction
    [protocols.OBIS_OBSERVER]: ( {direction, bytes} ) => (
        obisObserver.message[direction].fromBytes(bytes)
    )
};


/**
 * @this fastify.FastifyInstance
 */
export default async function hook ( request, reply ) {
    const direction = eventMap[request.query.event];
    const {body} = request;

    this.log.trace('received from chirpstack: %s', JSON.stringify(body));

    if ( !direction ) {
        // unnecessary events
        this.log.warn('unknown event type');
        reply.send('ok');

        return;
    }

    const {deviceInfo} = body;

    if ( !deviceInfo?.tags?.protocol ) {
        reply.sendError(errors.BAD_REQUEST, `ChirpStack device profile must have tag: 'protocol'`);

        return;
    }

    const {protocol} = deviceInfo.tags;

    if ( !messageDecoders[protocol] ) {
        reply.sendError(
            errors.BAD_REQUEST,
            `ChirpStack device profile must have tag: 'protocol' with one of these values: ${Object.keys(messageDecoders)}`
        );

        return;
    }

    try {
        const {devEui} = deviceInfo;
        const {data} = body;

        if ( !data ) {
            reply.send('ok');

            return;
        }

        const bytes = utils.getBytesFromBase64(data);
        const result = messageDecoders[protocol]({bytes, direction, ...deviceInfo.tags});

        this.log.info('device: %s, decoded data: %j', devEui, result);

        // save for later push to integrations
        reply.payload = {
            devEui,
            deviceName: deviceInfo.deviceName,
            data: JSON.stringify(result)
        };

        reply.send('ok');
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
