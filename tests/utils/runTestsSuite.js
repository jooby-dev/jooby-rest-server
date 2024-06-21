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

const runRoutesTests = ( name, routes, tests ) => {
    describe(name, async () => {
        routes.forEach(route => runRouteTest(route, tests));
    });
};


export const runTestsSuite = ( name, routes, tests ) => {
    before(async () => {
        await fastify.ready();
    });

    runRoutesTests(name, routes, tests);

    after(async () => {
        await fastify.close();
    });
};

export const runTestsSuites = suites => {
    before(async () => {
        await fastify.ready();
    });

    suites.forEach(({name, routes, tests}) => runRoutesTests(name, routes, tests));

    after(async () => {
        await fastify.close();
    });
};
