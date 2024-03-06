import {utils} from '@jooby-dev/jooby-codec/index.js';


const prepareCommand = ( command, options ) => {
    const json = command.toJson(options);
    const {constructor: {id, name}} = command;

    return json ? {id, name, ...JSON.parse(json)} : {id, name};
};

export const prepareCommands = ( commands, options ) => commands.map(({command}) => prepareCommand(command, options));

export const prepareFrame = ( {isValid, bytes, content}, options ) => ({
    isValid,
    bytes: utils.getStringFromBytes(bytes, options),
    content: utils.getStringFromBytes(content, options)
});
