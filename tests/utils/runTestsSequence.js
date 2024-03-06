import fastify from '../../src/index.js';
import postRequest from './postRequest.js';
import {describe, it, before, after} from 'node:test';
import assert from 'node:assert';


const runTest = async ( {url, requestExtension}, {name, request, response} ) => {
    it(name, async () => {
        const {status, data} = await postRequest(url, {...request, ...requestExtension});

        assert.equal(status, 200);
        assert.deepStrictEqual(data, response);
    });
};

const runRouteTest = ( route, tests ) => (
    describe(route.url, async () => tests.forEach( test => runTest(route, test)))
);

export const runTestsSequence = ( name, routes, tests ) => {
    before(async () => {
        await fastify.ready();
    });

    describe(name, async () => {
        routes.forEach(route => runRouteTest(route, tests));
    });

    after(async () => {
        await fastify.close();
    });
};
