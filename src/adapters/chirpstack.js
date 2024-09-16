import {BASE64} from 'jooby-codec/constants/bytesConversionFormats.js';
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
        // ignore other events except uplink
        return null;
    }

    const {deviceInfo} = body;
    const {tags} = deviceInfo;
    const protocol = tags?.protocol;
    const hardwareType = tags?.hardwareType ? Number(tags.hardwareType) : undefined;
    const deviceEUI = deviceInfo.devEui;

    return {
        protocol,
        direction,
        deviceEUI,
        hardwareType,
        data: body.data,
        bytesConversionFormat: BASE64
    };
};
