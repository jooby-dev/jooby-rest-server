export const prepareCommand = command => {
    const {parameters, message, constructor: {id, name}} = command;

    return {id, name, parameters, message};
};

export const prepareCommands = commands => commands.map(({command}) => prepareCommand(command));
