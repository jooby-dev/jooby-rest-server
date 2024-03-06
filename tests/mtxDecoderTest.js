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
            data: '01101007000042'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            data: '01101007000042',
            message: {
                messageId: 1,
                accessLevel: 0,
                commands: [{
                    id: 7,
                    name: 'GetDateTime'
                }]
            }
        }
    },
    {
        name: 'default bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            data: '01101007000042'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            data: '01101007000042',
            message: {
                messageId: 1,
                accessLevel: 0,
                commands: [{
                    id: 7,
                    name: 'GetDateTime'
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
            data: 'ARAQBwAAQg=='
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            data: 'ARAQBwAAQg==',
            message: {
                messageId: 1,
                accessLevel: 0,
                commands: [{
                    id: 7,
                    name: 'GetDateTime'
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
            data: '7e50ffff0001551010070000004f707e'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: HEX,
            framingFormat: HDLC,
            data: '7e50ffff0001551010070000004f707e',
            frames: [{
                isValid: true,
                bytes: '7e50ffff0001551010070000004f707e',
                content: '50ffff000155101007000000',
                type: 80,
                destination: 65535,
                source: 1,
                messageId: 85,
                accessLevel: 0,
                commands: [{
                    id: 7,
                    name: 'GetDateTime'
                }]
            }]
        }
    },
    {
        name: 'hdlc frame, default bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            framingFormat: HDLC,
            data: '7e50ffff0001551010070000004f707e'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            framingFormat: HDLC,
            data: '7e50ffff0001551010070000004f707e',
            frames: [{
                isValid: true,
                bytes: '7e50ffff0001551010070000004f707e',
                content: '50ffff000155101007000000',
                type: 80,
                destination: 65535,
                source: 1,
                messageId: 85,
                accessLevel: 0,
                commands: [{
                    id: 7,
                    name: 'GetDateTime'
                }]
            }]
        }
    },
    {
        name: 'hdlc frame, base64 bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: BASE64,
            framingFormat: HDLC,
            data: 'flD//wABVRAQBwAAAE9wfg=='
        },
        response: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: BASE64,
            framingFormat: HDLC,
            data: 'flD//wABVRAQBwAAAE9wfg==',
            frames: [{
                isValid: true,
                bytes: 'flD//wABVRAQBwAAAE9wfg==',
                content: 'UP//AAFVEBAHAAAA',
                type: 80,
                destination: 65535,
                source: 1,
                messageId: 85,
                accessLevel: 0,
                commands: [{
                    id: 7,
                    name: 'GetDateTime'
                }]
            }]
        }
    },
    {
        name: 'hdlc frame, hex bytes format, encrypted',
        request: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: HEX,
            framingFormat: HDLC,
            aesKey: '000102030405060708090a0b0c0d0e0f',
            data: '7e50fffffffe0c7d334704a6e5e63701ad37a5d57192143c52d91c7e'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: HEX,
            framingFormat: HDLC,
            data: '7e50fffffffe0c7d334704a6e5e63701ad37a5d57192143c52d91c7e',
            frames: [{
                isValid: true,
                bytes: '7e50fffffffe0c7d334704a6e5e63701ad37a5d57192143c52d91c7e',
                content: '50fffffffe0c134704a6e5e63701ad37a5d57192143c52',
                type: 80,
                destination: 65535,
                source: 65534,
                messageId: 12,
                accessLevel: 3,
                commands: [{
                    id: 7,
                    name: 'GetDateTime'
                }]
            }]
        }
    },
    {
        name: 'hdlc frame, default bytes format, encrypted',
        request: {
            deviceEUI: '001a79881701b63c',
            framingFormat: HDLC,
            aesKey: '000102030405060708090a0b0c0d0e0f',
            data: '7e50fffffffe0c7d334704a6e5e63701ad37a5d57192143c52d91c7e'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            framingFormat: HDLC,
            data: '7e50fffffffe0c7d334704a6e5e63701ad37a5d57192143c52d91c7e',
            frames: [{
                isValid: true,
                bytes: '7e50fffffffe0c7d334704a6e5e63701ad37a5d57192143c52d91c7e',
                content: '50fffffffe0c134704a6e5e63701ad37a5d57192143c52',
                type: 80,
                destination: 65535,
                source: 65534,
                messageId: 12,
                accessLevel: 3,
                commands: [{
                    id: 7,
                    name: 'GetDateTime'
                }]
            }]
        }
    },
    {
        name: 'hdlc frame, base64 bytes format, encrypted',
        request: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: BASE64,
            framingFormat: HDLC,
            aesKey: 'AAECAwQFBgcICQoLDA0ODw==',
            data: 'flD////+DH0zRwSm5eY3Aa03pdVxkhQ8Utkcfg=='
        },
        response: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: BASE64,
            framingFormat: HDLC,
            data: 'flD////+DH0zRwSm5eY3Aa03pdVxkhQ8Utkcfg==',
            frames: [{
                isValid: true,
                bytes: 'flD////+DH0zRwSm5eY3Aa03pdVxkhQ8Utkcfg==',
                content: 'UP////4ME0cEpuXmNwGtN6XVcZIUPFI=',
                type: 80,
                destination: 65535,
                source: 65534,
                messageId: 12,
                accessLevel: 3,
                commands: [{
                    id: 7,
                    name: 'GetDateTime'
                }]
            }]
        }
    }
];

const routes = [
    {url: '/v1/decoder/mtx'},
    {url: '/v1/decoder', requestExtension: {protocol: 'mtx'}}
];


runTestsSequence('mtx decoder', routes, tests);
