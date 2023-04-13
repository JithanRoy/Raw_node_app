

//dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');


const routes = {
    'sample' : sampleHandler,
    'user' : userHandler,
}

module.exports = routes;