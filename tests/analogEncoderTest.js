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
            commands: [
                {
                    id: 7,
                    name: 'GetDateTime'
                }
            ]
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            data: '070052'
        }
    },
    {
        name: 'default bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            commands: [
                {
                    id: 7,
                    name: 'GetDateTime'
                }
            ]
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            data: '070052'
        }
    },
    {
        name: 'base64 bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            commands: [
                {
                    id: 7,
                    name: 'GetDateTime'
                }
            ]
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            data: 'BwBS'
        }
    },
    {
        name: 'hdlc frame, hex bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            framingFormat: HDLC,
            frame: {
                commands: [
                    {
                        id: 7,
                        name: 'GetDateTime'
                    }
                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: HEX,
            direction: DOWNLINK,
            framingFormat: HDLC,
            frame: {
                data: '7e0700525e3b7e'
            }
        }
    },
    {
        name: 'hdlc frame, default bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            framingFormat: HDLC,
            frame: {
                commands: [
                    {
                        id: 7,
                        name: 'GetDateTime'
                    }
                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            framingFormat: HDLC,
            frame: {
                data: '7e0700525e3b7e'
            }
        }
    },
    {
        name: 'hdlc frame, base64 bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            framingFormat: HDLC,
            frame: {
                commands: [
                    {
                        id: 7,
                        name: 'GetDateTime'
                    }
                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: BASE64,
            direction: DOWNLINK,
            framingFormat: HDLC,
            frame: {
                data: 'fgcAUl47fg=='
            }
        }
    }
];

const routes = [
    {url: '/v1/encoder/analog'},
    {url: '/v1/encoder', requestExtension: {protocol: 'analog'}}
];


runTestsSequence('analog encoder', routes, tests);
