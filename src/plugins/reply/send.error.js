import fastifyPlugin from 'fastify-plugin';


export default fastifyPlugin((fastify, options, done) => {
    /**
     * Send error reply.
     * Callback should be non-arrow function.
     *
     * @property {Function} sendError - send error reply
     */
    fastify.decorateReply(
        'sendError',
        /**
         * @param {object} error - error data
         * @param {object} fullError - detailed error description
         *
         * @this fastify
         */
        function sendError ( error, fullError ) {
            this.log.warn(fullError);

            this.status(error.code).send(error.body);
        }
    );

    done();
});
