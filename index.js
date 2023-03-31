/*
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down time of user defined links
 * Author: Jithan Roy ( Learn with Sumit )
 * Date: 03/29/2023
 *
 */

//dependencies
const http = require('http');
const url = require('url');
const {StringDecoder} = require("string_decoder");

//app object - module scaffolding
const app = {};

// configuration
app.config = {
    port: 3000
};

//create server 
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`listening to port ${app.config.port}`);
    });
};

//handle Request Response
app.handleReqRes = (req, res) => {
    //Request handle
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedUrl = path.replace(/^\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

    const decoder = new StringDecoder('utf-8');
    let resultData = '';
    req.on('data', (buffer) => {
        resultData += decoder.write(buffer);
    })
    req.on('end', () => {
        resultData += decoder.end();
        console.log(resultData);
    })
    console.log(queryStringObject);
    //response handle
};

//start server
app.createServer();