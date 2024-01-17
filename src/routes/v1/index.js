import analog from './analog.js';
import obisObserver from './obisObserver.js';


export default async fastify => {
    // this route required to inform nginx about service status
    fastify.get('/health', ( request, reply ) => {
        reply.type('text/plain').send('I\'m alive!');
    });

    analog(fastify);
    obisObserver(fastify);
};
