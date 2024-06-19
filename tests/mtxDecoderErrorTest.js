import {HEX} from '@jooby-dev/jooby-codec/constants/bytesConversionFormats.js';
import {HDLC} from '../src/constants/framingFormats.js';
import {DOWNLINK} from '../src/constants/directions.js';
import {MTX} from '../src/constants/protocols.js';
import {runTestsSequence} from './utils/runTestsSequence.js';


const tests = [
    {
        name: 'invalid message',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            data: '1e09239123101107000000d5'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            data: '1e09239123101107000000d5',
            commands: [{
                id: 30,
                name: 'dataSegment',
                parameters: {
                    segmentationSessionId: 35,
                    segmentIndex: 1,
                    segmentsNumber: 1,
                    isLast: true,
                    data: '23101107000000',
                    payload: '23101107000000'
                }
            }],
            assembledMessages: [{
                segmentationSessionId: 35,
                data: '23101107000000',
                invalidMessage: {
                    error: 'Mismatch access levels.',
                    message: {
                        id: 35,
                        accessLevel: 0,
                        commands: [{
                            id: 7,
                            name: 'getDateTime'
                        }]
                    }
                }
            }]
        }
    },
    {
        name: 'hdlc frame, invalid message',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            framingFormat: HDLC,
            data: '7e50ffff000155107d31070000000b7b7e'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            framingFormat: HDLC,
            data: '7e50ffff000155107d31070000000b7b7e',
            frames: [{
                data: '7e50ffff000155107d31070000000b7b7e',
                payload: '55101107000000', //'50ffff000155101007000000',
                header: {
                    type: 80,
                    destination: 65535,
                    source: 1
                },
                invalidMessage: {
                    error: 'Mismatch access levels.',
                    message: {
                        id: 85,
                        accessLevel: 0,
                        commands: [{
                            id: 7,
                            name: 'getDateTime'
                        }]
                    }
                }
            }]
        }
    },
    {
        name: 'hdlc frame, invalid message',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            framingFormat: HDLC,
            data: '7e50ffff0001551010070000004f717e'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            framingFormat: HDLC,
            data: '7e50ffff0001551010070000004f717e',
            frames: [{
                error: 'Mismatch CRC.',
                frame: {
                    data: '7e50ffff0001551010070000004f717e',
                    payload: '50ffff000155101007000000'
                }
            }]
        }
    }
];

const routes = [
    {url: `/v2/decoder/${MTX}`},
    {url: '/v2/decoder', requestExtension: {protocol: MTX}}
];

runTestsSequence('mtx decoder', routes, tests);
