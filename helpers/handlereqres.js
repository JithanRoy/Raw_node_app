
//dependencies
const url = require('url');
const {StringDecoder} = require("string_decoder");
const routes = require('../routes');
const {notFoundHandler} = require('./../handlers/routeHandlers/notFoundHandler');

//module scaffolding
const handler = {};

//handle Request Response
handler.handleReqRes = (req, res) => {
    //Request handle
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedUrl = path.replace(/^\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

    const requestProperties = {
        parsedUrl,
        path,
        trimmedUrl,
        method,
        queryStringObject,
        headersObject,
    };

    const decoder = new StringDecoder('utf-8');
    let resultData = '';

    const chosenHandler = routes[trimmedUrl] ? routes[trimmedUrl] : notFoundHandler;

    chosenHandler(requestProperties, (statusCode, payload) => {
        statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
        payload = typeof(payload) === 'object' ? payload : {};

        const payloadString = JSON.stringify(payload);
        console.log(payloadString);

        //return the final response
        res.writeHead(statusCode);
        res.end(payloadString);
    });

    req.on('data', (buffer) => {
        resultData += decoder.write(buffer);
    })

    req.on('end', () => {
        resultData += decoder.end();
        console.log(resultData);
    })
    //response handle
};

module.exports = handler;