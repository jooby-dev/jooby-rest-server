import {UPLINK} from '../src/constants/directions.js';
import {MTX1} from '../src/constants/protocols.js';
import {runTestsSuite} from './utils/runTestsSuite.js';


const tests = [
    {
        name: 'getDayMaxPower',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: UPLINK,
            segmentationSessionId: 1,
            maxSegmentSize: 40,
            message: {
                id: 2,
                commands: [
                    {
                        id: 121,
                        name: 'getDayMaxPower',
                        parameters: {
                            date: {
                                year: 24,
                                month: 1,
                                date: 8
                            },
                            tariffs: [
                                {
                                    'A+': {hours: 1, minutes: 29, power: 8},
                                    'A+R+': {hours: 0, minutes: 26, power: 8},
                                    'A+R-': {hours: 0, minutes: 29, power: 8},
                                    'A-': {hours: 1, minutes: 58, power: 8}
                                },
                                {
                                    'A+': {hours: 1, minutes: 29, power: 8},
                                    'A+R+': {hours: 0, minutes: 26, power: 8},
                                    'A+R-': {hours: 0, minutes: 29, power: 8},
                                    'A-': {hours: 1, minutes: 58, power: 8}
                                },
                                {
                                    'A+': {hours: 1, minutes: 29, power: 8},
                                    'A+R+': {hours: 0, minutes: 26, power: 8},
                                    'A+R-': {hours: 0, minutes: 29, power: 8},
                                    'A-': {hours: 1, minutes: 58, power: 8}
                                },
                                {
                                    'A+': {hours: 1, minutes: 29, power: 8},
                                    'A+R+': {hours: 0, minutes: 26, power: 8},
                                    'A+R-': {hours: 0, minutes: 29, power: 8},
                                    'A-': {hours: 1, minutes: 58, power: 8}
                                }
                            ]
                        }
                    }
                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: UPLINK,
            segmentationSessionId: 1,
            maxSegmentSize: 40,
            data: [
                '1e260131021010796430280fff011d00000008001a00000008001a00000008011d00000008001a00b0',
                '1e260132000008001a00000008011d00000008001a00000008001a00000008011d00000008001a005e',
                '1e2501b3000008001a00000008013a00000008013a00000008013a00000008013a0000000800b076'
            ]
        }
    }
];

const routes = [
    {url: `/v2/encoder/${MTX1}`},
    {
        url: '/v2/encoder',
        extendRequest: request => {
            request.protocol = MTX1;

            return request;
        }
    }
];


runTestsSuite('mtxLora encoder', routes, tests);
