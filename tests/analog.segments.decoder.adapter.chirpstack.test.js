import {BASE64} from '@jooby-dev/jooby-codec/constants/bytesConversionFormats.js';
import {UPLINK} from '../src/constants/directions.js';
import {describe} from 'node:test';
import {ANALOG} from '../src/constants/protocols.js';
import {runTestsSuites} from './utils/runTestsSuite.js';


const segment1 = {
    name: 'segment 1',
    request: {
        deduplicationId: 'kre8ew92-cea8-47a3-a338-fdc72e3af1f8',
        time: '2024-05-22T13:04:47.051925516+00:00',
        deviceInfo: {
            tenantId: '52f14cd4-c6f1-4fbd-8f87-4025e1d49242',
            tenantName: 'ChirpStack',
            applicationId: 'a0d28bc5-98b2-4d12-837a-697a3b0df35d',
            applicationName: 'jooby-rest-server',
            deviceProfileId: 'fc4eab2d-c020-4da0-9b02-c27baba4ece2',
            deviceProfileName: 'EU868_1.02.b_CLASSA_OTAA',
            deviceName: '4PU_001a79881701e779',
            devEui: '001a79881701e779',
            deviceClassEnabled: 'CLASS_A',
            tags: {
                hardwareType: '3'
            }
        },
        devAddr: '01516558',
        adr: true,
        dr: 5,
        fCnt: 1009,
        fPort: 1,
        confirmed: false,
        data: 'HijEMU0QEHlkMCgP/wEdAAAACAAaAAAACAAdAAAACAEdAAAACAAaAAAAMw==',
        rxInfo: [
            {
                gatewayId: '001a790714000d6b',
                uplinkId: 43827,
                nsTime: '2024-06-29T13:03:21.920612683+00:00',
                rssi: -106,
                snr: -4.5,
                channel: 7,
                location: {},
                context: 'ewe4nQ==',
                metadata: {
                    region_common_name: 'EU868',
                    region_config_id: 'eu868'
                },
                crcStatus: 'CRC_OK'
            }
        ],
        txInfo: {
            frequency: 867900000,
            modulation: {
                lora: {
                    bandwidth: 125000,
                    spreadingFactor: 7,
                    codeRate: 'CR_4_5'
                }
            }
        }
    },
    response: {
        deviceEUI: '001a79881701e779',
        direction: UPLINK,
        bytesConversionFormat: BASE64,
        hardwareType: 3,
        data: 'HijEMU0QEHlkMCgP/wEdAAAACAAaAAAACAAdAAAACAEdAAAACAAaAAAAMw==',
        commands: [{
            id: 30,
            name: 'dataSegment',
            parameters: {
                data: 'TRAQeWQwKA//AR0AAAAIABoAAAAIAB0AAAAIAR0AAAAIABoAAAA=',
                segmentationSessionId: 196,
                segmentIndex: 1,
                segmentsNumber: 3,
                isLast: false
            }
        }]
    }
};

const segment2 = {
    name: 'segment 2',
    request: {
        deduplicationId: 'kre8ew92-cea8-47a3-a338-fdc72e3af1f8',
        time: '2024-05-22T13:04:47.051925516+00:00',
        deviceInfo: {
            tenantId: '52f14cd4-c6f1-4fbd-8f87-4025e1d49242',
            tenantName: 'ChirpStack',
            applicationId: 'a0d28bc5-98b2-4d12-837a-697a3b0df35d',
            applicationName: 'jooby-rest-server',
            deviceProfileId: 'fc4eab2d-c020-4da0-9b02-c27baba4ece2',
            deviceProfileName: 'EU868_1.02.b_CLASSA_OTAA',
            deviceName: '4PU_001a79881701e779',
            devEui: '001a79881701e779',
            deviceClassEnabled: 'CLASS_A',
            tags: {
                hardwareType: '3'
            }
        },
        devAddr: '01516558',
        adr: true,
        dr: 5,
        fCnt: 1009,
        fPort: 1,
        confirmed: false,
        data: 'HijEMggAHQAAAAgBHQAAAAgAGgAAAAgAHQAAAAgBHQAAAAgAGgAAAAgAnQ==',
        rxInfo: [
            {
                gatewayId: '001a790714000d6b',
                uplinkId: 43827,
                nsTime: '2024-06-29T13:03:21.920612683+00:00',
                rssi: -106,
                snr: -4.5,
                channel: 7,
                location: {},
                context: 'ewe4nQ==',
                metadata: {
                    region_common_name: 'EU868',
                    region_config_id: 'eu868'
                },
                crcStatus: 'CRC_OK'
            }
        ],
        txInfo: {
            frequency: 867900000,
            modulation: {
                lora: {
                    bandwidth: 125000,
                    spreadingFactor: 7,
                    codeRate: 'CR_4_5'
                }
            }
        }
    },
    response: {
        deviceEUI: '001a79881701e779',
        direction: UPLINK,
        bytesConversionFormat: BASE64,
        hardwareType: 3,
        data: 'HijEMggAHQAAAAgBHQAAAAgAGgAAAAgAHQAAAAgBHQAAAAgAGgAAAAgAnQ==',
        commands: [
            {
                id: 30,
                name: 'dataSegment',
                parameters: {
                    data: 'CAAdAAAACAEdAAAACAAaAAAACAAdAAAACAEdAAAACAAaAAAACAA=',
                    segmentationSessionId: 196,
                    segmentIndex: 2,
                    segmentsNumber: 3,
                    isLast: false
                }
            }
        ]
    }
};

const segment3 = {
    name: 'segment 3 (last)',
    request: {
        deduplicationId: 'kre8ew92-cea8-47a3-a338-fdc72e3af1f8',
        time: '2024-05-22T13:04:47.051925516+00:00',
        deviceInfo: {
            tenantId: '52f14cd4-c6f1-4fbd-8f87-4025e1d49242',
            tenantName: 'ChirpStack',
            applicationId: 'a0d28bc5-98b2-4d12-837a-697a3b0df35d',
            applicationName: 'jooby-rest-server',
            deviceProfileId: 'fc4eab2d-c020-4da0-9b02-c27baba4ece2',
            deviceProfileName: 'EU868_1.02.b_CLASSA_OTAA',
            deviceName: '4PU_001a79881701e779',
            devEui: '001a79881701e779',
            deviceClassEnabled: 'CLASS_A',
            tags: {
                hardwareType: '3'
            }
        },
        devAddr: '01516558',
        adr: true,
        dr: 5,
        fCnt: 1009,
        fPort: 1,
        confirmed: false,
        data: 'HiHEsx0AAAAIAToAAAAIAToAAAAIAToAAAAIAToAAAAIAABj0Lnl5w==',
        rxInfo: [
            {
                gatewayId: '001a790714000d6b',
                uplinkId: 43827,
                nsTime: '2024-06-29T13:03:21.920612683+00:00',
                rssi: -106,
                snr: -4.5,
                channel: 7,
                location: {},
                context: 'ewe4nQ==',
                metadata: {
                    region_common_name: 'EU868',
                    region_config_id: 'eu868'
                },
                crcStatus: 'CRC_OK'
            }
        ],
        txInfo: {
            frequency: 867900000,
            modulation: {
                lora: {
                    bandwidth: 125000,
                    spreadingFactor: 7,
                    codeRate: 'CR_4_5'
                }
            }
        }
    },
    response: {
        deviceEUI: '001a79881701e779',
        direction: UPLINK,
        bytesConversionFormat: BASE64,
        hardwareType: 3,
        data: 'HiHEsx0AAAAIAToAAAAIAToAAAAIAToAAAAIAToAAAAIAABj0Lnl5w==',
        commands: [
            {
                id: 30,
                name: 'dataSegment',
                parameters: {
                    segmentationSessionId: 196,
                    segmentIndex: 3,
                    segmentsNumber: 3,
                    isLast: true,
                    data: 'HQAAAAgBOgAAAAgBOgAAAAgBOgAAAAgBOgAAAAgAAA==',
                    payload: `TRAQeWQwKA//AR0AAAAIABoAAAAIAB0AAAAIAR0AAAAIABoAAAAIAB0AAAAIAR0A \
                        AAAIABoAAAAIAB0AAAAIAR0AAAAIABoAAAAIAB0AAAAIAToAAAAIAToAAAAIAToAAAAIAToAAAAIAAA=`.replace(/\s/g, '')
                }
            },
            {
                id: 96,
                name: 'lastEvent',
                parameters: {
                    sequenceNumber: 208,
                    status: {
                        isBatteryLow: true,
                        isButtonReleased: false,
                        isConnectionLost: true,
                        isMagneticInfluence: false
                    }
                }
            }
        ]
    }
};

const routes = [
    {
        url: `/v2/decoder/${ANALOG}?event=up`,
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
            request.deviceInfo.tags.protocol = ANALOG;

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


describe('analog segments decoder with ChirpStack adapter', () => {
    runTestsSuites(tests);
});
