import * as constants from '@jooby-dev/jooby-codec/constants/index.js';
import {runTestsSequence} from './utils/runTestsSequence.js';


const {HEX, BASE64} = constants.bytesConversionFormats;
const {DOWNLINK} = constants.directions;


const tests = [
    {
        name: 'segment1',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            data: 'HgkjkSMQEAcAAADU'
        },
        response: {
            protocol: 'analog',
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            data: 'HgkjkSMQEAcAAADU',
            message: {
                isValid: true,
                commands: [{
                    id: 30,
                    name: 'DataSegment',
                    segmentationSessionId: 35,
                    segmentIndex: 1,
                    segmentsNumber: 1,
                    isLast: true,
                    data: 'IxAQBwAAAA==',
                    assembledData: 'IxAQBwAAAA=='
                }]
            }
        }
    },
    {
        name: 'segment2',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            data: '1e09239123101007000000d4'
        },
        response: {
            protocol: 'analog',
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            data: '1e09239123101007000000d4',
            message: {
                isValid: true,
                commands: [{
                    id: 30,
                    name: 'DataSegment',
                    segmentationSessionId: 35,
                    segmentIndex: 1,
                    segmentsNumber: 1,
                    isLast: true,
                    data: '23101007000000',
                    assembledData: '23101007000000'
                }]
            }
        }
    },
    {
        name: 'segment3',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            data: '1e09239123101007000000d4'
        },
        response: {
            protocol: 'analog',
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            data: '1e09239123101007000000d4',
            message: {
                isValid: true,
                commands: [{
                    id: 30,
                    name: 'DataSegment',
                    segmentationSessionId: 35,
                    segmentIndex: 1,
                    segmentsNumber: 1,
                    isLast: true,
                    data: '23101007000000',
                    assembledData: '23101007000000'
                }]
            }
        }
    }
];

const routes = [
    {url: '/v1/decoder/analog'},
    {url: '/v1/decoder', requestExtension: {protocol: 'analog'}}
];

runTestsSequence('analog segments decoder (simple)', routes, tests);
