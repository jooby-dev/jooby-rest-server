import {utils} from '@jooby-dev/jooby-codec/index.js';


const prepareCommand = ( command, options ) => {
    const {constructor: {id, name}} = command;
    let result = {id, name};

    try {
        result = {...result, ...JSON.parse(command.toJson(options))};
        // eslint-disable-next-line no-empty
    } catch {}

    return result;
};

export const prepareCommands = ( commands, options ) => commands.map(({command}) => prepareCommand(command, options));

export const prepareFrame = ( {isValid, bytes, content}, options ) => ({
    isValid,
    bytes: utils.getStringFromBytes(bytes, options),
    content: utils.getStringFromBytes(content, options)
});
