import DataSegmentsCollector from 'jooby-codec/analog/DataSegmentsCollector.js';
import getEnvNumber from '../../utils/get.env.number.js';


const collectors = new Map();

const COLLECTOR_TTL = getEnvNumber('COLLECTOR_TTL', 120);

const getEpochSeconds = () => Math.floor(Date.now() / 1000);

const cleanupCollectors = () => {
    const currentTime = getEpochSeconds();

    [...collectors].forEach(([key, {creationTimeSec}]) => {
        if ( creationTimeSec + COLLECTOR_TTL < currentTime ) {
            collectors.delete(key);
        }
    });
};

setInterval(cleanupCollectors, 5 * 60 * 1000);


export const getSegmentCollector = deviceEUI => {
    let collector = collectors.get(deviceEUI);

    if ( !collector ) {
        collector = new DataSegmentsCollector();
        collector.creationTime = getEpochSeconds();
        collectors.set(deviceEUI, collector);
    }

    return collector;
};

export const removeSegmentCollector = deviceEUI => collectors.delete(deviceEUI);
