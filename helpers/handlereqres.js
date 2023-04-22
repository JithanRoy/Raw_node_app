
//dependencies
const url = require('url');
const {StringDecoder} = require("string_decoder");
const routes = require('../routes');
const {notFoundHandler} = require('./../handlers/routeHandlers/notFoundHandler');
const {parseJSON} = require('../helpers/utilities')

//module scaffolding
const handlers = {};

//handle Request Response
handlers.handleReqRes = (req, res) => {
    //Request handle
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

    // console.log(parsedUrl, path, trimmedPath);
    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject,
    };

    const decoder = new StringDecoder('utf-8');
    let resultData = '';

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    req.on('data', (buffer) => {
        resultData += decoder.write(buffer);
    })

    req.on('end', () => {
        resultData += decoder.end();
        
        requestProperties.body = parseJSON(resultData);
        console.log(requestProperties.body);
        chosenHandler(requestProperties, (statusCode, payload) => {
            statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
            payload = typeof(payload) === 'object' ? payload : {};

            const payloadString = JSON.stringify(payload);
            console.log(payloadString);

            //return the final response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    })
};

module.exports = handlers;