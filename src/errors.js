const errors = {
    NOT_FOUND: {
        code: 404,
        body: {
            message: 'Resource not found.'
        }
    },

    BAD_REQUEST: {
        code: 400,
        body: {
            message: 'Wrong parameters.'
        }
    },

    INVALID_DATA: {
        code: 400,
        body: {
            message: 'Parameters validation failed. Check structure/types/limitations.'
        }
    },

    INTERNAL_SERVER_ERROR: {
        code: 500,
        body: {
            message: 'Oops. Server encountered an unexpected condition.'
        }
    }
};


// duplicate error id to code in body
Object.entries(errors).forEach(([errorName, errorValue]) => {
    errorValue.body.code = errorName;
});

export default Object.freeze(errors);
