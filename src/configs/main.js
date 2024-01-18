import pino from './pino.js';


const {env} = process;

const http = {
    host: env.HTTP_HOST || '0.0.0.0',
    port: env.HTTP_PORT || 3000
};


export {
    pino,
    http
};
