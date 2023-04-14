

// module scaffolding
const handler = {};

handler.userHandler = (requestHandler, callback) => {
    callback(200, {
        message: 'this is a user url',
    });
};

module.exports = handler;