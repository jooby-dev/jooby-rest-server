import {OBIS_OBSERVER} from '../src/constants/protocols.js';
import {HDLC} from '../src/constants/framingFormats.js';
import {runTestsSuite} from './utils/runTestsSuite.js';


const tests = [
    {
        name: 'unknown command',
        request: {
            deviceEUI: '001a79881701b63c',
            data: 'fc080108080001'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            data: 'fc080108080001',
            commands: [{
                id: 252,
                error: 'Unsupported command id: 252!',
                data: 'fc080108080001'
            }]
        }
    },
    {
        name: 'broken hdlc frame',
        request: {
            deviceEUI: '001a79881701b63c',
            framingFormat: HDLC,
            data: '7e040501083456080001567c4e7e'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            framingFormat: HDLC,
            data: '7e040501083456080001567c4e7e',
            frames: [{
                error: 'Mismatch CRC.',
                frame: {
                    data: '7e040501083456080001567c4e7e',
                    payload: '040501083456080001'
                }
            }]
        }
    }
];

const routes = [
    {url: `/v2/decoder/${OBIS_OBSERVER}`},
    {
        url: '/v2/decoder',
        extendRequest: request => {
            request.protocol = OBIS_OBSERVER;

            return request;
        }
    }
];


runTestsSuite('obisObserver decoder', routes, tests);
