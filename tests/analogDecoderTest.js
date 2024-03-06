import * as constants from '@jooby-dev/jooby-codec/constants/index.js';
import {HDLC} from '../src/constants/framingFormats.js';
import {runTestsSequence} from './utils/runTestsSequence.js';


const {HEX, BASE64} = constants.bytesConversionFormats;
const {DOWNLINK} = constants.directions;


const tests = [
    {
        name: 'hex bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            data: '1f020048'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            data: '1f020048',
            message: {
                isValid: true,
                commands: [{
                    id: 543,
                    name: 'GetLmicInfo'
                }]
            }
        }
    },
    {
        name: 'default bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            data: '1f020048'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            data: '1f020048',
            message: {
                isValid: true,
                commands: [{
                    id: 543,
                    name: 'GetLmicInfo'
                }]
            }
        }
    },
    {
        name: 'base64 bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            data: 'HwIASA=='
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            data: 'HwIASA==',
            message: {
                isValid: true,
                commands: [{
                    id: 543,
                    name: 'GetLmicInfo'
                }]
            }
        }
    },
    {
        name: 'hdlc frame, hex bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: HEX,
            framingFormat: HDLC,
            data: '7e1f02004872f67e'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: HEX,
            framingFormat: HDLC,
            data: '7e1f02004872f67e',
            frames: [{
                isValid: true,
                bytes: '7e1f02004872f67e',
                content: '1f020048',
                message: {
                    isValid: true,
                    commands: [{
                        id: 543,
                        name: 'GetLmicInfo'
                    }]
                }
            }]
        }
    },
    {
        name: 'hdlc frame, default bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            framingFormat: HDLC,
            data: '7e1f02004872f67e'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            framingFormat: HDLC,
            data: '7e1f02004872f67e',
            frames: [{
                isValid: true,
                bytes: '7e1f02004872f67e',
                content: '1f020048',
                message: {
                    isValid: true,
                    commands: [{
                        id: 543,
                        name: 'GetLmicInfo'
                    }]
                }
            }]
        }
    },
    {
        name: 'hdlc frame, base64 bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: BASE64,
            framingFormat: HDLC,
            data: 'fh8CAEhy9n4='
        },
        response: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: BASE64,
            framingFormat: HDLC,
            data: 'fh8CAEhy9n4=',
            frames: [{
                isValid: true,
                bytes: 'fh8CAEhy9n4=',
                content: 'HwIASA==',
                message: {
                    isValid: true,
                    commands: [{
                        id: 543,
                        name: 'GetLmicInfo'
                    }]
                }
            }]
        }
    }
];

const routes = [
    {url: '/v1/decoder/analog'},
    {url: '/v1/decoder', requestExtension: {protocol: 'analog'}}
];


runTestsSequence('analog decoder', routes, tests);
