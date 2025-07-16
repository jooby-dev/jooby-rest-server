/* eslint import/first: 0 */
// this file imported first at index.js to setup globals and environment variables

import dotenv from 'dotenv';

dotenv.config({quiet: true});

process.on('unhandledRejection', error => {
    console.error('unhandledRejection', error);

    // eslint-disable-next-line no-process-exit
    process.exit(1);
});
