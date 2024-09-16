import pino from './pino.js';
import {hexFormatOptions} from 'jooby-codec/config.js';


hexFormatOptions.separator = '';

const {env} = process;

const http = {
    host: env.HTTP_HOST || '0.0.0.0',
    port: env.HTTP_PORT || 3000
};

const auth = {
    apiKey: env.API_KEY
};

const integrations = {
    fileName: 'integrations.json' || env.INTEGRATIONS_FILENAME
};


export {
    pino,
    http,
    auth,
    integrations
};
