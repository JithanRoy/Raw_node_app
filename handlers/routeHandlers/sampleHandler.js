// module scaffolding
const handler = {};

handler.sampleHandler = (requestHandler, callback) => {
    console.log(requestHandler);
    callback('200', {
        message: 'your sample request',
    });
},
module.exports = handler;
