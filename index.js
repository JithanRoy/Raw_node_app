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
    'name': 'Singapore',
    'language': 'Bangla',
    'description': 'valuable'
}

// testing file system
// data.create('test', 'newFile', sampleObjects, (err) => {
//     console.log(`error was`, err);
// })

// data.read('test', 'newFile', (err, data) => {
//     console.log(err,data); 
// })

// data.update('test', 'newFile', sampleObjects, (err, data) => {
//     console.log("updated data is", data, err);
// })

data.delete('test', 'newFile', (err) => {
    console.log(err);
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
