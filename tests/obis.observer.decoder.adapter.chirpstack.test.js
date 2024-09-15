import {BASE64} from 'jooby-codec/constants/bytesConversionFormats.js';
import {UPLINK} from '../src/constants/directions.js';
import {OBIS_OBSERVER} from '../src/constants/protocols.js';
import {runTestsSuite} from './utils/runTestsSuite.js';


const tests = [
    {
        name: 'getObserverCapabilities response',
        request: {
            deduplicationId: '9b89dcf6-1f02-4560-95e0-c2a3458f4861',
            time: '2024-07-03T11:48:05.375809891+00:00',
            deviceInfo: {
                tenantId: '52f14cd4-c6f1-4fbd-8f87-4025e1d49242',
                tenantName: 'ChirpStack',
                applicationId: '5f3d2afb-9405-44e7-b36b-b58a87a19044',
                applicationName: 'Devices',
                deviceProfileId: '4a67e1ed-0bb2-429d-a770-42049f6732d5',
                deviceProfileName: 'jooby-class-c',
                deviceName: '001a798814005801',
                devEui: '001a798814005801',
                deviceClassEnabled: 'CLASS_C'
            },
            devAddr: '00005801',
            adr: true,
            dr: 0,
            fCnt: 680,
            fPort: 1,
            confirmed: false,
            data: 'BAUHCAj/AQ==',
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
            bytesConversionFormat: BASE64,
            direction: UPLINK,
            data: 'BAUHCAj/AQ==',
            commands: [{
                id: 4,
                name: 'getObserverCapabilities',
                parameters: {
                    requestId: 7,
                    maxMeterProfilesNumber: 8,
                    maxMetersNumber: 8,
                    maxObisProfilesNumber: 255,
                    isMultiModeSupported: true
                }
            }]
        }
    }
];

const routes = [
    {
        url: `/v2/decoder/${OBIS_OBSERVER}?event=up`,
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
            request.deviceInfo.tags = {protocol: OBIS_OBSERVER};

            return request;
        }
    }
];


runTestsSuite('obisObserver decoder with ChirpStack adapter', routes, tests);
