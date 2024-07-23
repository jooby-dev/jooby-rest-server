import {BASE64} from '@jooby-dev/jooby-codec/constants/bytesConversionFormats.js';
import {UPLINK} from '../src/constants/directions.js';
import {ANALOG} from '../src/constants/protocols.js';
import {runTestsSuite} from './utils/runTestsSuite.js';


const tests = [
    {
        name: 'super status event',
        request: {
            deduplicationId: 'ef2f9c03-cea8-47a3-a338-fdc72e3af1f8',
            time: '2024-06-29T13:03:22.051925516+00:00',
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
            data: 'FA0CCgMBxW3CJzIOaCIqVw==',
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
            data: 'FA0CCgMBxW3CJzIOaCIqVw==',
            commands: [{
                id: 20,
                name: 'status',
                parameters: {
                    software: {
                        type: 2,
                        version: 10
                    },
                    hardware: {
                        type: 3,
                        version: 1
                    },
                    data: {
                        batteryVoltage: {
                            underLowLoad: 3158,
                            underHighLoad: 3522
                        },
                        batteryInternalResistance: 10034,
                        temperature: 14,
                        remainingBatteryCapacity: 40.9,
                        lastEventSequenceNumber: 34,
                        downlinkQuality: 42
                    }
                }
            }]
        }
    },
    {
        name: 'super getArchiveDays response',
        request: {
            deduplicationId: 'ef2f9c03-cea8-47a3-a338-fdc72e3af1f8',
            time: '2024-06-29T13:03:22.051925516+00:00',
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
            data: 'BgapbYAAAOr7',
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
            data: 'BgapbYAAAOr7',
            commands: [{
                id: 6,
                name: 'getArchiveDays',
                parameters: {
                    startTime2000: 2678227200,
                    dayList: [
                        {
                            isMagneticInfluence: true,
                            value: 234
                        }
                    ]
                }
            }]
        }
    }
];

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


runTestsSuite('analog decoder with ChirpStack adapter', routes, tests);
