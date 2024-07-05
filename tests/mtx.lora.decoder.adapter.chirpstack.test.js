import {UNENCRYPTED} from '@jooby-dev/jooby-codec/mtx/constants/accessLevels.js';
import {BASE64} from '@jooby-dev/jooby-codec/constants/bytesConversionFormats.js';
import {UPLINK} from '../src/constants/directions.js';
import {MTX} from '../src/constants/protocols.js';
import {describe} from 'node:test';
import {runTestsSuites} from './utils/runTestsSuite.js';


const segment1 = {
    name: 'segment 1',
    request: {
        deduplicationId: 'c68d9c42-2380-429f-a148-dcfb51dc4711',
        time: '2024-07-03T11:28:05.225803991+00:00',
        deviceInfo: {
            tenantId: '52f14cd4-c6f1-4fbd-8f87-4025e1d49242',
            tenantName: 'ChirpStack',
            applicationId: '5f3d2afb-9405-44e7-b36b-b58a87a19044',
            applicationName: 'Class-C-Devices',
            deviceProfileId: '4a67e1ed-0bb2-429d-a770-42049f6732d5',
            deviceProfileName: 'jooby-class-c',
            deviceName: 'MTX_001a798814005801',
            devEui: '001a798814005801',
            deviceClassEnabled: 'CLASS_C'
        },
        devAddr: '00005801',
        adr: true,
        dr: 0,
        fCnt: 680,
        fPort: 1,
        confirmed: false,
        data: 'HijEMU0QEHlkMCgP/wEdAAAACAAaAAAACAAdAAAACAEdAAAACAAaAAAAMw==',
        rxInfo: [
            {
                gatewayId: '001a790714000d6b',
                uplinkId: 28852,
                nsTime: '2024-07-03T11:48:05.232284194+00:00',
                rssi: -102,
                snr: -1.2,
                rfChain: 1,
                location: {},
                context: 'LrInyw==',
                metadata: {
                    region_config_id: 'eu868',
                    region_common_name: 'EU868'
                },
                crcStatus: 'CRC_OK'
            }
        ],
        txInfo: {
            frequency: 868100000,
            modulation: {
                lora: {
                    bandwidth: 125000,
                    spreadingFactor: 12,
                    codeRate: 'CR_4_5'
                }
            }
        }
    },
    response: {
        deviceEUI: '001a798814005801',
        direction: UPLINK,
        bytesConversionFormat: BASE64,
        data: 'HijEMU0QEHlkMCgP/wEdAAAACAAaAAAACAAdAAAACAEdAAAACAAaAAAAMw==',
        commands: [{
            id: 30,
            name: 'dataSegment',
            parameters: {
                segmentationSessionId: 196,
                segmentIndex: 1,
                segmentsNumber: 3,
                isLast: false,
                data: 'TRAQeWQwKA//AR0AAAAIABoAAAAIAB0AAAAIAR0AAAAIABoAAAA='
            }
        }]
    }
};

const segment2 = {
    name: 'segment 2',
    request: {
        deduplicationId: 'ee786855-dc91-4a38-8f09-0efc63eb7c49',
        time: '2024-07-03T11:42:13.765349891+00:00',
        deviceInfo: {
            tenantId: '52f14cd4-c6f1-4fbd-8f87-4025e1d49242',
            tenantName: 'ChirpStack',
            applicationId: '5f3d2afb-9405-44e7-b36b-b58a87a19044',
            applicationName: 'Class-C-Devices',
            deviceProfileId: '4a67e1ed-0bb2-429d-a770-42049f6732d5',
            deviceProfileName: 'jooby-class-c',
            deviceName: 'MTX_001a798814005801',
            devEui: '001a798814005801',
            deviceClassEnabled: 'CLASS_C'
        },
        devAddr: '00005801',
        adr: true,
        dr: 0,
        fCnt: 680,
        fPort: 1,
        confirmed: false,
        data: 'HijEMggAHQAAAAgBHQAAAAgAGgAAAAgAHQAAAAgBHQAAAAgAGgAAAAgAnQ==',
        rxInfo: [
            {
                gatewayId: '001a790714000d6b',
                uplinkId: 28852,
                nsTime: '2024-07-03T11:48:05.232284194+00:00',
                rssi: -102,
                snr: -1.2,
                rfChain: 1,
                location: {},
                context: 'LrInyw==',
                metadata: {
                    region_config_id: 'eu868',
                    region_common_name: 'EU868'
                },
                crcStatus: 'CRC_OK'
            }
        ],
        txInfo: {
            frequency: 868100000,
            modulation: {
                lora: {
                    bandwidth: 125000,
                    spreadingFactor: 12,
                    codeRate: 'CR_4_5'
                }
            }
        }
    },
    response: {
        deviceEUI: '001a798814005801',
        direction: UPLINK,
        bytesConversionFormat: BASE64,
        data: 'HijEMggAHQAAAAgBHQAAAAgAGgAAAAgAHQAAAAgBHQAAAAgAGgAAAAgAnQ==',
        commands: [{
            id: 30,
            name: 'dataSegment',
            parameters: {
                segmentationSessionId: 196,
                segmentIndex: 2,
                segmentsNumber: 3,
                isLast: false,
                data: 'CAAdAAAACAEdAAAACAAaAAAACAAdAAAACAEdAAAACAAaAAAACAA='
            }
        }]
    }
};

const segment3 = {
    name: 'segment 3 (last)',
    request: {
        deduplicationId: '9b89dcf6-1f02-4560-95e0-c2a3458f4861',
        time: '2024-07-03T11:48:05.375809891+00:00',
        deviceInfo: {
            tenantId: '52f14cd4-c6f1-4fbd-8f87-4025e1d49242',
            tenantName: 'ChirpStack',
            applicationId: '5f3d2afb-9405-44e7-b36b-b58a87a19044',
            applicationName: 'Class-C-Devices',
            deviceProfileId: '4a67e1ed-0bb2-429d-a770-42049f6732d5',
            deviceProfileName: 'jooby-class-c',
            deviceName: 'MTX_001a798814005801',
            devEui: '001a798814005801',
            deviceClassEnabled: 'CLASS_C'
        },
        devAddr: '00005801',
        adr: true,
        dr: 0,
        fCnt: 680,
        fPort: 1,
        confirmed: false,
        data: 'HiHEsx0AAAAIAToAAAAIAToAAAAIAToAAAAIAToAAAAIAABj0Lnl5w==',
        rxInfo: [
            {
                gatewayId: '001a790714000d6b',
                uplinkId: 28852,
                nsTime: '2024-07-03T11:48:05.232284194+00:00',
                rssi: -102,
                snr: -1.2,
                rfChain: 1,
                location: {},
                context: 'LrInyw==',
                metadata: {
                    region_config_id: 'eu868',
                    region_common_name: 'EU868'
                },
                crcStatus: 'CRC_OK'
            }
        ],
        txInfo: {
            frequency: 868100000,
            modulation: {
                lora: {
                    bandwidth: 125000,
                    spreadingFactor: 12,
                    codeRate: 'CR_4_5'
                }
            }
        }
    },
    response: {
        deviceEUI: '001a798814005801',
        direction: UPLINK,
        bytesConversionFormat: BASE64,
        data: 'HiHEsx0AAAAIAToAAAAIAToAAAAIAToAAAAIAToAAAAIAABj0Lnl5w==',
        commands: [
            {
                id: 30,
                name: 'dataSegment',
                parameters:
                {
                    segmentationSessionId: 196,
                    segmentIndex: 3,
                    segmentsNumber: 3,
                    isLast: true,
                    data: 'HQAAAAgBOgAAAAgBOgAAAAgBOgAAAAgBOgAAAAgAAA==',
                    payload: `TRAQeWQwKA//AR0AAAAIABoAAAAIAB0AAAAIAR0AAAAIABo \
                        AAAAIAB0AAAAIAR0AAAAIABoAAAAIAB0AAAAIAR0AAAAIABoAAAAIAB0A \
                        AAAIAToAAAAIAToAAAAIAToAAAAIAToAAAAIAAA=`.replace(/\s/g, '')
                }
            },
            {
                id: 96,
                name: 'lastEvent',
                parameters: {
                    sequenceNumber: 208,
                    status: {
                        isMeterCaseOpen: true,
                        isMagneticInfluence: false,
                        isParametersSetRemotely: false,
                        isParametersSetLocally: true,
                        isMeterProgramRestarted: true,
                        isLockedOut: true,
                        isTimeSet: false,
                        isTimeCorrected: true,
                        isMeterFailure: true,
                        isMeterTerminalBoxOpen: false,
                        isModuleCompartmentOpen: true,
                        isTariffPlanChanged: false,
                        isNewTariffPlanReceived: false
                    }
                }
            }
        ],
        assembledMessages: [{
            data: `TRAQeWQwKA//AR0AAAAIABoAAAAIAB0AAAAIAR0AAAAIABoAAAAIAB0AAAA \
                IAR0AAAAIABoAAAAIAB0AAAAIAR0AAAAIABoAAAAIAB0AAAAIAToAAAAIAToAAAAIA \
                ToAAAAIAToAAAAIAAA=`.replace(/\s/g, ''),
            segmentationSessionId: 196,
            message: {
                id: 77,
                accessLevel: UNENCRYPTED,
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
        }]
    }
};


const routes = [
    {
        url: `/v2/decoder/${MTX}?event=up`,
        headers: {
            'ns-adapter': 'chirpstack'
        }
    },
    {
        url: '/v2/decoder?event=up',
        headers: {
            'ns-adapter': 'chirpstack'
        },
        extendRequest: request => {
            request.deviceInfo.tags = {protocol: MTX};

            return request;
        }
    }
];

const tests = [
    {
        name: 'segments: 1, 2, 3 (last)',
        routes,
        tests: [segment1, segment2, segment3]
    },
    {
        name: 'segments: 2, 1, 3 (last)',
        routes,
        tests: [segment2, segment1, segment3]
    }
];


describe('mtxLora decoder with ChirpStack adapter', () => {
    runTestsSuites(tests);
});
