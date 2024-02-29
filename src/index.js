import './setup.js';
import buildFastify from './buildFastify.js';
import {http as configHTTP} from './configs/main.js';
import {stopCollectorsCleaner} from './controllers/utils/collectorsCleaner.js'


const fastify = buildFastify();


// Run the server!
fastify
    .listen(configHTTP)
    .catch(error => {
        console.error('Error starting server:', error);
        process.exit(1);
    });

fastify.addHook('onClose', (instance, done) => {
    stopCollectorsCleaner();
    done();
});


export default fastify;
