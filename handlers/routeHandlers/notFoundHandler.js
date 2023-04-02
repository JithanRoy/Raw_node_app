
// module scaffolding
const handler = {};

handler.notFoundHandler = (requestHandler, callback) => {
    console.log(requestHandler);
    callback('404', {
        message: "your sample request was not found!!!"
    })
}

module.exports = handler