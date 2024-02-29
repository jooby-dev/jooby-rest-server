import DataSegmentsCollector from 'jooby-codec/analog/DataSegmentsCollector.js';
import {getNumber} from '../../utils/environment.js';


const collectors = new Map();

const COLLECTOR_TTL = getNumber('COLLECTOR_TTL', 120);
const COLLECTOR_CLEANUP_INTERVAL = getNumber('COLLECTOR_CLEANUP_INTERVAL', 5 * 60 * 1000);


const getEpochSeconds = () => Math.floor(Date.now() / 1000);

const cleanupCollectors = () => {
    const currentTime = getEpochSeconds();

    [...collectors].forEach(([key, {creationTimeSec}]) => {
        if ( creationTimeSec + COLLECTOR_TTL < currentTime ) {
            collectors.delete(key);
        }
    });
};

setInterval(cleanupCollectors, COLLECTOR_CLEANUP_INTERVAL);


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
