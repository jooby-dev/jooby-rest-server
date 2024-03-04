import {analog, utils} from 'jooby-codec/index.js';
import DataSegment from 'jooby-codec/analog/commands/DataSegmentBase.js';
import {getSegmentCollector, removeSegmentCollector} from '../../utils/segmentCollectors.js';


export const decodeAnalogMessage = ( bytes, options ) => {
    const {message} = analog;
    const {deviceEUI, bytesConversionFormat} = options;
    const {commands, isValid} = message.fromBytes(bytes, options);
    const assembledDataArray = [];

    for ( let index = 0; index < commands.length; index++ ) {
        const {command} = commands[index];

        if ( command instanceof DataSegment ) {
            const collector = getSegmentCollector(deviceEUI);
            const assembledData = collector.push(command.parameters);

            if ( assembledData.length !== 0 ) {
                command.parameters.assembledData = utils.getStringFromBytes(assembledData, bytesConversionFormat);
                assembledDataArray.push({
                    segmentationSessionId: command.parameters.segmentationSessionId,
                    data: assembledData
                });

                removeSegmentCollector(deviceEUI);
            }
        }
    }

    const result = {
        isValid,
        commands
    };

    if ( assembledDataArray.length !== 0 ) {
        result.assembledData = assembledDataArray;
    }

    return result;
};
