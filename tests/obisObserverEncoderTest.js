import * as constants from '@jooby-dev/jooby-codec/constants/index.js';
import {HDLC} from '../src/constants/framingFormats.js';
import {runTestsSequence} from './utils/runTestsSequence.js';


const {HEX, BASE64} = constants.bytesConversionFormats;


const tests = [
    {
        name: 'hex bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: HEX,
            commands: [
                {
                    id: 5,
                    name: 'DOWN_GET_OBSERVER_UPTIME',
                    requestId: 2
                }

            ]
        },
        response: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: HEX,
            data: '050102'
        }
    },
    {
        name: 'default bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            commands: [
                {
                    id: 5,
                    name: 'DOWN_GET_OBSERVER_UPTIME',
                    requestId: 2
                }

            ]
        },
        response: {
            deviceEUI: '001a79881701b63c',
            data: '050102'
        }
    },
    {
        name: 'base64 bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: BASE64,
            commands: [
                {
                    id: 5,
                    name: 'DOWN_GET_OBSERVER_UPTIME',
                    requestId: 2
                }

            ]
        },
        response: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: BASE64,
            data: 'BQEC'
        }
    },
    {
        name: 'hdlc frame, hex bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: HEX,
            framingFormat: HDLC,
            frame: {
                commands: [
                    {
                        id: 5,
                        name: 'DOWN_GET_OBSERVER_UPTIME',
                        requestId: 2
                    }

                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: HEX,
            framingFormat: HDLC,
            frame: {
                data: '7e050102bbc57e'
            }
        }
    },
    {
        name: 'hdlc frame, default bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            framingFormat: HDLC,
            frame: {
                commands: [
                    {
                        id: 5,
                        name: 'DOWN_GET_OBSERVER_UPTIME',
                        requestId: 2
                    }

                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            framingFormat: HDLC,
            frame: {
                data: '7e050102bbc57e'
            }
        }
    },
    {
        name: 'hdlc frame, base64 bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: BASE64,
            framingFormat: HDLC,
            frame: {
                commands: [
                    {
                        id: 5,
                        name: 'DOWN_GET_OBSERVER_UPTIME',
                        requestId: 2
                    }

                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: BASE64,
            framingFormat: HDLC,
            frame: {
                data: 'fgUBArvFfg=='
            }
        }
    }
];

const routs = [
    {url: '/v1/encoder/obisObserver'},
    {url: '/v1/encoder', requestExtension: {protocol: 'obisObserver'}}
];


runTestsSequence('obisObserver encoder', routs, tests);
