/*
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down time of user defined links
 * Author: Jithan Roy ( Learn with Sumit )
 * Date: 03/29/2023
 *
 */

// dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handlereqres');
const environment = require('./helpers/environments');
const data = require('./lib/data');

// app object - module scaffolding
const app = {};

const sampleObjects = {
    'name': 'Bangladesh',
    'language': 'English',
}

//testing file system
data.create('test', 'newFile', sampleObjects, (err) => {
    console.log(`error was`, err);
})

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log(`listening to port ${environment.port}`);
    });
};

// handle request response
app.handleReqRes = handleReqRes;

// start server
app.createServer();
