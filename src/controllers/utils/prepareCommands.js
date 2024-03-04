import {utils} from 'jooby-codec/index.js';


export const prepareCommand = ( command, bytesConversionFormat ) => {
    const json = command.toJson(bytesConversionFormat);
    const {constructor: {id, name}} = command;

    return json ? {id, name, ...JSON.parse(json)} : {id, name};
};

export const prepareCommands = ( commands, bytesConversionFormat ) => commands.map(({command}) => prepareCommand(command, bytesConversionFormat));

export const prepareFrame = ( {isValid, bytes, content}, bytesConversionFormat ) => ({
    isValid,
    bytes: utils.getStringFromBytes(bytes, bytesConversionFormat),
    content: utils.getStringFromBytes(content, bytesConversionFormat)
});
