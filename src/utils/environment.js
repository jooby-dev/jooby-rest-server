const allowedValues = ['true', 'false'];

export const getBoolean = ( name, defaultValue ) => {
    let result = defaultValue;

    if ( name in process.env ) {
        const value = process.env[name].trim().toLowerCase();

        if ( allowedValues.includes(value) ) {
            result = value === 'true';
        } else {
            console.error(`process.env.${name} got an invalid value "${value}"`);
        }
    }

    return result;
};

export const getNumber = ( name, defaultValue ) => {
    const value = process.env[name];

    if ( value ) {
        const interval = Number(value);

        if ( Number.isNaN(interval) || !Number.isFinite(interval) ) {
            console.error(`process.env.${name} got an invalid number`);
            console.error('real value', value);
            console.error('parsed value', interval);
        } else {
            defaultValue = interval;
        }
    }

    return defaultValue;
};
