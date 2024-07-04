import {getFastify} from '../../src/fastify.js';
import postRequest from './postRequest.js';
import {describe, it, before, after} from 'node:test';
import assert from 'node:assert';


const runTest = async ( {url, requestExtension, headers}, {name, request, response} ) => {
    it(name, async () => {
        const {status, data} = await postRequest(url, {...request, ...requestExtension}, {headers});

        assert.equal(status, 200);
        assert.deepStrictEqual(data, response);
    });
};

const runRouteTest = async ( route, tests ) => (
    describe(route.url, async () => {
        for ( const test of tests ) {
            await runTest(route, test);
        }
    })
);

const runRoutesTests = async ( name, routes, tests ) => {
    describe(name, async () => {
        for ( const route of routes ) {
            await runRouteTest(route, tests);
        }
    });
};


export const runTestsSuite = async ( name, routes, tests ) => {
    let fastify;

    before(async () => {
        fastify = await getFastify();

        await fastify.ready();
    });

    await runRoutesTests(name, routes, tests);

    after(async () => {
        await fastify.close();
    });
};

export const runTestsSuites = async suites => {
    let fastify;

    before(async () => {
        fastify = await getFastify();

        await fastify.ready();
    });

    for ( const {name, routes, tests} of suites ) {
        await runRoutesTests(name, routes, tests);
    }

    after(async () => {
        await fastify.close();
    });
};
