import {analog, mtxLora, utils, constants} from '@jooby-dev/jooby-codec/index.js';
import fetch from 'node-fetch';

import * as protocols from '../../constants/protocols.js';
import config from '../../configs/chirpstack.js';
import errors from '../../errors.js';


const {DOWNLINK, UPLINK} = constants.directions;
const eventMap = {
    txack: DOWNLINK,
    up: UPLINK
};

const messageDecoders = {
    [protocols.ANALOG]: ( {bytes, direction, hardwareType} ) => {
        if ( !hardwareType ) {
            throw new Error('hardwareType tag must be set in device profile');
        }

        return analog.message.fromBytes(bytes, {direction, hardwareType});
    },
    [protocols.MTX_LORA]: ( {bytes, direction} ) => (
        mtxLora.message.fromBytes(bytes, {direction})
    )
};

const chirpStackHeaders = {
    Accept: 'application/json',
    'Grpc-Metadata-Authorization': `Bearer ${config.apiKey}`
};

const getDownlinkData = async ( eui, queueItemId ) => {
    const response = await fetch(
        new URL(`api/devices/${eui}/queue`, config.apiUrl),
        {
            method: 'GET',
            headers: chirpStackHeaders
        }
    );

    const item = response.result.find(({id}) => id === queueItemId);

    return item.data;
};


/**
 * @this fastify.FastifyInstance
 */
export default async function hook ( request, reply ) {
    const direction = eventMap[request.query.event];

    if ( !direction ) {
        // unnecessary events
        reply.sendError(errors.BAD_REQUEST, `unknown event type: '${request.query.event}'`);

        return;
    }

    const {body} = request;
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
        let {data} = body;

        if ( direction === DOWNLINK && !data ) {
            data = await getDownlinkData(devEui, body.queueItemId);
        }

        const bytes = utils.getBytesFromBase64(data);

        // TODO: save/store/send parsed data to third-party service
        const result = messageDecoders[protocol]({bytes, direction, ...deviceInfo.tags});

        this.log.info('device: %s, decoded data: %j', devEui, result);

        reply.status(200).send('ok');
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
