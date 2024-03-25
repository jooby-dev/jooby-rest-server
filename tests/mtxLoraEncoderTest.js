import * as constants from '@jooby-dev/jooby-codec/constants/index.js';
import {runTestsSequence} from './utils/runTestsSequence.js';


const {UPLINK} = constants.directions;


const tests = [
    {
        name: 'GetDayMaxPower',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: UPLINK,
            messageId: 2,
            segmentationSessionId: 1,
            maxSegmentSize: 40,
            commands: [
                {
                    id: 121,
                    name: 'GetDayMaxPower',
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
            ]
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: UPLINK,
            messageId: 2,
            segmentationSessionId: 1,
            maxSegmentSize: 40,
            segments: [
                '1e2a0131021010796430280fff011d00000008001a00000008001a00000008011d00000008001a0000000800b4',
                '1e2a01321a00000008011d00000008001a00000008001a00000008011d00000008001a00000008001a00000048',
                '1e1d01b308013a00000008013a00000008013a00000008013a0000000800b05c'
            ]
        }
    }
];

const routes = [
    {url: '/v1/encoder/mtxLora'},
    {url: '/v1/encoder', requestExtension: {protocol: 'mtxLora'}}
];


runTestsSequence('mtxLora encoder', routes, tests);
