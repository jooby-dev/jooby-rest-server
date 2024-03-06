import {getFrameCollector} from '../../utils/frameCollectors.js';


const decodeFrames = ( {deviceEUI, bytes}, frameDataBits ) => {
    const collector = getFrameCollector(deviceEUI, frameDataBits);

    return collector.process(bytes);
};

export default decodeFrames;
