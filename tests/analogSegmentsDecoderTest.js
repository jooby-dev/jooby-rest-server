import * as constants from '@jooby-dev/jooby-codec/constants/index.js';
import {describe} from 'node:test';
import {runTestsSequence} from './utils/runTestsSequence.js';

const {BASE64} = constants.bytesConversionFormats;
const {DOWNLINK} = constants.directions;


const segment1 = {
    name: 'segment 1',
    request: {
        deviceEUI: '001a79881701b63c',
        direction: DOWNLINK,
        bytesConversionFormat: BASE64,
        data: 'HijEMU0QEHlkMCgP/wEdAAAACAAaAAAACAAdAAAACAEdAAAACAAaAAAAMw=='
    },
    response: {
        deviceEUI: '001a79881701b63c',
        direction: DOWNLINK,
        bytesConversionFormat: BASE64,
        data: 'HijEMU0QEHlkMCgP/wEdAAAACAAaAAAACAAdAAAACAEdAAAACAAaAAAAMw==',
        message: {
            isValid: true,
            commands: [{
                id: 30,
                name: 'DataSegment',
                segmentationSessionId: 196,
                segmentIndex: 1,
                segmentsNumber: 3,
                isLast: false,
                data: 'TRAQeWQwKA//AR0AAAAIABoAAAAIAB0AAAAIAR0AAAAIABoAAAA='
            }]
        }
    }
};

const segment2 = {
    name: 'segment 2',
    request: {
        deviceEUI: '001a79881701b63c',
        direction: DOWNLINK,
        bytesConversionFormat: BASE64,
        data: 'HijEMggAHQAAAAgBHQAAAAgAGgAAAAgAHQAAAAgBHQAAAAgAGgAAAAgAnQ=='
    },
    response: {
        deviceEUI: '001a79881701b63c',
        direction: DOWNLINK,
        bytesConversionFormat: BASE64,
        data: 'HijEMggAHQAAAAgBHQAAAAgAGgAAAAgAHQAAAAgBHQAAAAgAGgAAAAgAnQ==',
        message: {
            isValid: true,
            commands: [{
                id: 30,
                name: 'DataSegment',
                segmentationSessionId: 196,
                segmentIndex: 2,
                segmentsNumber: 3,
                isLast: false,
                data: 'CAAdAAAACAEdAAAACAAaAAAACAAdAAAACAEdAAAACAAaAAAACAA='
            }]
        }
    }
};

const segment3 = {
    name: 'segment 3 (last)',
    request: {
        deviceEUI: '001a79881701b63c',
        direction: DOWNLINK,
        bytesConversionFormat: BASE64,
        data: 'HiHEsx0AAAAIAToAAAAIAToAAAAIAToAAAAIAToAAAAIAABj0Lnl5w=='
    },
    response: {
        deviceEUI: '001a79881701b63c',
        direction: DOWNLINK,
        bytesConversionFormat: BASE64,
        data: 'HiHEsx0AAAAIAToAAAAIAToAAAAIAToAAAAIAToAAAAIAABj0Lnl5w==',
        message: {
            isValid: true,
            commands: [
                {
                    id: 30,
                    name: 'DataSegment',
                    segmentationSessionId: 196,
                    segmentIndex: 3,
                    segmentsNumber: 3,
                    isLast: true,
                    data: 'HQAAAAgBOgAAAAgBOgAAAAgBOgAAAAgBOgAAAAgAAA==',
                    assembledData: `TRAQeWQwKA//AR0AAAAIABoAAAAIAB0AAAAIAR0AAAAIABoAAAAIAB0AAAAIAR0A \
                        AAAIABoAAAAIAB0AAAAIAR0AAAAIABoAAAAIAB0AAAAIAToAAAAIAToAAAAIAToAAAAIAToAAAAIAAA=`.replace(/\s/g, '')
                },
                {
                    id: 96,
                    name: 'UnknownCommand',
                    data: '0Lnl'
                }
            ]
        }
    }
};

const tests = [
    {
        name: 'segments: 1, 2, 3 (last)',
        segments: [segment1, segment2, segment3]
    },
    {
        name: 'segments: 2, 1, 3 (last)',
        segments: [segment2, segment1, segment3]
    }
];

const routes = [
    {url: '/v1/decoder/analog'},
    {url: '/v1/decoder', requestExtension: {protocol: 'analog'}}
];


describe('analog segments decoder', () => {
    tests.forEach(({name, segments}) => runTestsSequence(name, routes, segments));
});
