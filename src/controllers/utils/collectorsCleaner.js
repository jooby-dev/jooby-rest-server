import {cleanupFrameCollectors} from './frameCollectors.js';
import {cleanupSegmentCollectors} from './segmentCollectors.js';
import {getNumber} from '../../utils/environment.js';
import getEpochSeconds from '../../utils/getEpochSeconds.js';


const COLLECTOR_TTL = getNumber('COLLECTOR_TTL', 120);
const COLLECTOR_CLEANUP_INTERVAL = getNumber('COLLECTOR_CLEANUP_INTERVAL', 60 * 1000); // 5 * 60 * 1000

const cleanupCollectors = ( currentTime = getEpochSeconds() ) => {
    cleanupFrameCollectors(currentTime, COLLECTOR_TTL);
    cleanupSegmentCollectors(currentTime, COLLECTOR_TTL);
};


let cleanerIntervalId = 0;


const startCollectorsCleaner = () => {
    if ( cleanerIntervalId === 0 ) {
        cleanerIntervalId = setInterval(cleanupCollectors, COLLECTOR_CLEANUP_INTERVAL);
    }
};

const stopCollectorsCleaner = () => {
    if ( cleanerIntervalId ) {
        clearInterval(cleanerIntervalId);
        cleanerIntervalId = 0;
        // force all collectors to clean
        cleanupCollectors(getEpochSeconds() + 2 * COLLECTOR_TTL);
    }
};


export {
    startCollectorsCleaner,
    stopCollectorsCleaner
};
