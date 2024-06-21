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

const runRouteTest = async ( route, tests ) => (
    describe(route.url, async () => {
        // eslint-disable-next-line no-restricted-syntax
        for await ( const test of tests ) {
            await runTest(route, test);
        }
    })
);

const runRoutesTests = async ( name, routes, tests ) => {
    describe(name, async () => {
        // eslint-disable-next-line no-restricted-syntax
        for ( const route of routes ) {
            await runRouteTest(route, tests);
        }
    });
};


export const runTestsSuite = async ( name, routes, tests ) => {
    before(async () => {
        await fastify.ready();
    });

    await runRoutesTests(name, routes, tests);

    after(async () => {
        await fastify.close();
    });
};

export const runTestsSuites = async suites => {
    before(async () => {
        await fastify.ready();
    });

    // eslint-disable-next-line no-restricted-syntax
    for ( const {name, routes, tests} of suites ) {
        await runRoutesTests(name, routes, tests);
    }

    after(async () => {
        await fastify.close();
    });
};
