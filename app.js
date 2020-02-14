const { resetMockServer, createMock } = require('./create-mocks');
const { target } = require('./mock-server-config');
const request = require('request');

const expectation = {
    "httpRequest": {
        "method": "GET",
        "path": "/view/cart",
        "queryStringParameters": {
            "cartId": ["055CA455-1DF7-45BB-8535-4F83E7266092"]
        }
    },
    "httpResponse": {
        "body": "some_response_body"
    }
};

resetMockServer();

createMock(expectation);

request({
    method: expectation.httpRequest.method,
    url: `${target}${expectation.httpRequest.path}`,
    querystring: expectation.httpRequest.queryStringParameters
}, (error, response, body) => {

    if (!error && response.statusCode == 200) {
        const info = JSON.parse(body);
        console.log(info.stargazers_count + " Stars");
        console.log(info.forks_count + " Forks");
    }
});