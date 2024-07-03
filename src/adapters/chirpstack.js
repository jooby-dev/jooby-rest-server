import {BASE64} from '@jooby-dev/jooby-codec/constants/bytesConversionFormats.js';
import {UPLINK} from '../constants/directions.js';

const eventMap = {
    up: UPLINK
};

/**
 * Convert ChirpStack data to internal format.
 */
export default ( {body, query}, log ) => {
    const direction = eventMap[query.event];

    log.trace('received from chirpstack: %j', body);

    if ( !direction ) {
        return null;
    }

    const {deviceInfo} = body;
    const protocol = deviceInfo?.tags?.protocol;

    if ( !protocol ) {
        return null;
    }

    const deviceEUI = deviceInfo.devEui;

    return {
        protocol,
        direction,
        deviceEUI,
        data: body.data,
        bytesConversionFormat: BASE64
    };
};


/**
 * Convert chirpstack and decoded data to Thingsboard format.
 */
export const thingsboard = ( data, decodedPayload ) => ({
    deviceName: data.deviceInfo.deviceName,
    data: decodedPayload
});
