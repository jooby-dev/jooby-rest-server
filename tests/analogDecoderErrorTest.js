import {DOWNLINK} from '../src/constants/directions.js';
import {ANALOG} from '../src/constants/protocols.js';
import {HDLC} from '../src/constants/framingFormats.js';
import {runTestsSequence} from './utils/runTestsSequence.js';


const tests = [
    {
        name: 'broken command',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            data: '1e28c4314d1010796430280fff011d0000000800'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            data: '1e28c4314d1010796430280fff011d0000000800',
            error: 'Mismatch LRC.',
            message: {
                commands: [{
                    id: 30,
                    name: 'dataSegment',
                    parameters: {
                        segmentationSessionId: 196,
                        segmentIndex: 1,
                        segmentsNumber:
                        3,
                        isLast: false,
                        data: '4d1010796430280fff011d0000000800'
                    }
                }]
            }
        }
    },
    {
        name: 'broken hdlc frame',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            framingFormat: HDLC,
            data: '7e1f02003572f67e'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            framingFormat: HDLC,
            data: '7e1f02003572f67e',
            frames: [{
                error: 'Mismatch CRC.',
                frame: {
                    data: '7e1f02003572f67e',
                    payload: '1f020035'
                }
            }]
        }
    }
];

const routes = [
    {url: `/v2/decoder/${ANALOG}`},
    {url: '/v2/decoder', requestExtension: {protocol: ANALOG}}
];


runTestsSequence('analog decoder', routes, tests);
