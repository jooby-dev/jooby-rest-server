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
            data: '04050108080001'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: HEX,
            data: '04050108080001',
            commands: [{
                id: 4,
                name: 'GetObserverCapabilitiesResponse',
                requestId: 1,
                maxMeterProfilesNumber: 8,
                maxMetersNumber: 8,
                maxObisProfilesNumber: 0,
                isMultiModeSupported: true
            }]
        }
    },
    {
        name: 'default bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            data: '04050108080001'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            data: '04050108080001',
            commands: [{
                id: 4,
                name: 'GetObserverCapabilitiesResponse',
                requestId: 1,
                maxMeterProfilesNumber: 8,
                maxMetersNumber: 8,
                maxObisProfilesNumber: 0,
                isMultiModeSupported: true
            }]
        }
    },
    {
        name: 'base64 bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: BASE64,
            data: 'BAUBCAgAAQ=='
        },
        response: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: BASE64,
            data: 'BAUBCAgAAQ==',
            commands: [{
                id: 4,
                name: 'GetObserverCapabilitiesResponse',
                requestId: 1,
                maxMeterProfilesNumber: 8,
                maxMetersNumber: 8,
                maxObisProfilesNumber: 0,
                isMultiModeSupported: true
            }]
        }
    },
    {
        name: 'hdlc frame, hex bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: HEX,
            framingFormat: HDLC,
            data: '7e04050108080001567c4e7e'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: HEX,
            framingFormat: HDLC,
            data: '7e04050108080001567c4e7e',
            frames: [{
                isValid: true,
                bytes: '7e04050108080001567c4e7e',
                content: '04050108080001',
                commands: [{
                    id: 4,
                    name: 'GetObserverCapabilitiesResponse',
                    requestId: 1,
                    maxMeterProfilesNumber: 8,
                    maxMetersNumber: 8,
                    maxObisProfilesNumber: 0,
                    isMultiModeSupported: true
                }]
            }]
        }
    },
    {
        name: 'hdlc frame, default bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            framingFormat: HDLC,
            data: '7e04050108080001567c4e7e'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            framingFormat: HDLC,
            data: '7e04050108080001567c4e7e',
            frames: [{
                isValid: true,
                bytes: '7e04050108080001567c4e7e',
                content: '04050108080001',
                commands: [{
                    id: 4,
                    name: 'GetObserverCapabilitiesResponse',
                    requestId: 1,
                    maxMeterProfilesNumber: 8,
                    maxMetersNumber: 8,
                    maxObisProfilesNumber: 0,
                    isMultiModeSupported: true
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
            data: 'fgQFAQgIAAFWfE5+'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: BASE64,
            framingFormat: HDLC,
            data: 'fgQFAQgIAAFWfE5+',
            frames: [{
                isValid: true,
                bytes: 'fgQFAQgIAAFWfE5+',
                content: 'BAUBCAgAAQ==',
                commands: [{
                    id: 4,
                    name: 'GetObserverCapabilitiesResponse',
                    requestId: 1,
                    maxMeterProfilesNumber: 8,
                    maxMetersNumber: 8,
                    maxObisProfilesNumber: 0,
                    isMultiModeSupported: true
                }]
            }]
        }
    }
];

const routes = [
    {url: '/v1/decoder/obisObserver'},
    {url: '/v1/decoder', requestExtension: {protocol: 'obisObserver'}}
];


runTestsSequence('obisObserver decoder', routes, tests);
