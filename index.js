/*
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down time of user defined links
 * Author: Jithan Roy ( Learn with Sumit )
 * Date: 03/29/2023
 *
 */

//dependencies
const http = require('http');
const {handlereqres} = require('./helpers/handlereqres');

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

//handle request response
app.handleReqRes = handlereqres;


//start server
app.createServer();