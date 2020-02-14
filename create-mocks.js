const { mockServerClient } = require('mockserver-client');

const { host, port, target } = require('./mock-server-config');

const client = mockServerClient(host, port);

const resetMockServer = () => {
    client.reset()
        .then(() => {
            console.log(`Mock server reset: [${target}]`);
        })
        .catch(err => {
            console.error(`Error resetting mock server: [${target}]`, err);
            process.exit(1);
        });
};

const createMock = expectation => {

    const { httpRequest } = expectation;

    client.mockAnyResponse(expectation)
        .then(() => {
            console.log(`Expectation created: ${httpRequest.method} ${target}${httpRequest.path}`);
        })
        .catch((error) => {
            console.error('Error while creating expectation: ', error);
        });
};

module.exports = {
    resetMockServer,
    createMock
};
