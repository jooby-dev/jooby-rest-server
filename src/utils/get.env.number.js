export default ( name, defaultValue ) => {
    const value = process.env[name];

    if ( value ) {
        const interval = Number(value);

        if ( Number.isNaN(interval) || !Number.isFinite(interval) ) {
            // eslint-disable-next-line no-console
            console.error(`process.env.${name} got an invalid number`);
            // eslint-disable-next-line no-console
            console.error('real value', value);
            // eslint-disable-next-line no-console
            console.error('parsed value', interval);
        } else {
            defaultValue = interval;
        }
    }

    return defaultValue;
};
