import axios from 'axios';


const downlinkCounters = new Map();

const sendMessage = async ( integration, eui, data ) => {
    let downlinkCounter = downlinkCounters.get(eui) || 0;

    ++downlinkCounter;

    downlinkCounters.set(eui, downlinkCounter);

    return axios.post(
        new URL(`api/devices/${eui}/queue`, integration.url),
        {
            queueItem: {
                data,
                fPort: 1,
                fCntDown: downlinkCounter
            }
        },
        {headers: integration.headers}
    );
};


export const sendData = async ( integration, payload ) => {
    // decode default payload string to object
    payload = JSON.parse(payload);
    const messages = Array.isArray(payload.data) ? payload.data : [payload.data];

    for ( const message of messages ) {
        await sendMessage(integration, payload.deviceEUI, message);
    }
};
