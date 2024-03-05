import {mtx} from '@jooby-dev/jooby-codec/index.js';
import * as constants from '@jooby-dev/jooby-codec/constants/index.js';
import {HDLC} from '../src/constants/framingFormats.js';
import {runTestsSequence} from './utils/runTestsSequence.js';


const {READ_ONLY, UNENCRYPTED} = mtx.constants.accessLevels;
const {HEX, BASE64} = constants.bytesConversionFormats;
const {DOWNLINK} = constants.directions;


const tests = [
    {
        name: 'hex bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            accessLevel: UNENCRYPTED,
            messageId: 1,
            commands: [
                {
                    id: 7
                }
            ]
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            accessLevel: UNENCRYPTED,
            messageId: 1,
            data: '01101007000042'
        }
    },
    {
        name: 'default bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            accessLevel: UNENCRYPTED,
            messageId: 1,
            commands: [
                {
                    id: 7
                }
            ]
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            accessLevel: UNENCRYPTED,
            messageId: 1,
            data: '01101007000042'
        }
    },
    {
        name: 'base64 bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            accessLevel: UNENCRYPTED,
            messageId: 1,
            commands: [
                {
                    id: 7
                }
            ]
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            accessLevel: UNENCRYPTED,
            messageId: 1,
            data: 'ARAQBwAAQg=='
        }
    },
    {
        name: 'hdlc frame, hex bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            accessLevel: UNENCRYPTED,
            framingFormat: HDLC,
            frame: {
                messageId: 1,
                commands: [
                    {
                        id: 7
                    }
                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            accessLevel: UNENCRYPTED,
            framingFormat: HDLC,
            frame: {
                messageId: 1,
                data: '7e50fffffffe01101007000042f8427e'
            }
        }
    },
    {
        name: 'hdlc frame, default bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            accessLevel: UNENCRYPTED,
            framingFormat: HDLC,
            frame: {
                messageId: 1,
                commands: [
                    {
                        id: 7
                    }
                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            accessLevel: UNENCRYPTED,
            framingFormat: HDLC,
            frame: {
                messageId: 1,
                data: '7e50fffffffe01101007000042f8427e'
            }
        }
    },
    {
        name: 'hdlc frame, base64 bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            accessLevel: UNENCRYPTED,
            framingFormat: HDLC,
            frame: {
                messageId: 1,
                commands: [
                    {
                        id: 7
                    }
                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            accessLevel: UNENCRYPTED,
            framingFormat: HDLC,
            frame: {
                messageId: 1,
                data: 'flD////+ARAQBwAAQvhCfg=='
            }
        }
    },
    {
        name: 'base64 bytes format, encrypted',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            accessLevel: READ_ONLY,
            aesKey: 'AAECAwQFBgcICQoLDA0ODw==',
            messageId: 1,
            commands: [
                {
                    id: 7
                }
            ]
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            accessLevel: READ_ONLY,
            messageId: 1,
            data: 'ARNHBKbl5jcBrTel1XGSFDxS'
        }
    },
    {
        name: 'default bytes format, encrypted',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            accessLevel: READ_ONLY,
            aesKey: '000102030405060708090a0b0c0d0e0f',
            messageId: 1,
            commands: [
                {
                    id: 7
                }
            ]
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            accessLevel: READ_ONLY,
            messageId: 1,
            data: '01134704a6e5e63701ad37a5d57192143c52'
        }
    },
    {
        name: 'bytes format, encrypted',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            accessLevel: READ_ONLY,
            aesKey: '000102030405060708090a0b0c0d0e0f',
            messageId: 1,
            commands: [
                {
                    id: 7
                }
            ]
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            accessLevel: READ_ONLY,
            messageId: 1,
            data: '01134704a6e5e63701ad37a5d57192143c52'
        }
    },
    {
        name: 'hdlc frame, hex bytes format, encrypted',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            accessLevel: READ_ONLY,
            aesKey: '000102030405060708090a0b0c0d0e0f',
            framingFormat: HDLC,
            frame: {
                destination: 0xffff,
                source: 0xfffe,
                messageId: 1,
                commands: [
                    {
                        id: 7
                    }
                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            accessLevel: READ_ONLY,
            framingFormat: HDLC,
            frame: {
                destination: 0xffff,
                source: 0xfffe,
                messageId: 1,
                data: '7e50fffffffe017d334704a6e5e63701ad37a5d57192143c52dee07e'
            }
        }
    },
    {
        name: 'hdlc frame, default bytes format, encrypted',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            accessLevel: READ_ONLY,
            aesKey: '000102030405060708090a0b0c0d0e0f',
            framingFormat: HDLC,
            frame: {
                messageId: 1,
                commands: [
                    {
                        id: 7
                    }
                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            accessLevel: READ_ONLY,
            framingFormat: HDLC,
            frame: {
                messageId: 1,
                data: '7e50fffffffe017d334704a6e5e63701ad37a5d57192143c52dee07e'
            }
        }
    },
    {
        name: 'hdlc frame, base64 bytes format, encrypted',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            accessLevel: READ_ONLY,
            aesKey: 'AAECAwQFBgcICQoLDA0ODw==',
            framingFormat: HDLC,
            frame: {
                messageId: 1,
                commands: [
                    {
                        id: 7
                    }
                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            accessLevel: READ_ONLY,
            framingFormat: HDLC,
            frame: {
                messageId: 1,
                data: 'flD////+AX0zRwSm5eY3Aa03pdVxkhQ8Ut7gfg=='
            }
        }
    }
];


const routs = [
    {url: '/v1/encoder/mtx'},
    {url: '/v1/encoder', requestExtension: {protocol: 'mtx'}}
];


runTestsSequence('mtx encoder', routs, tests);
