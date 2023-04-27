
//dependencies
const https = require('https');
const { twilo } = require('./environments');
const querystring = require('querystring');

//module scaffoldings
const notifications = {};

notifications.sendTwiloSms = (phone, msg, callback) => {
    const userPhone = typeof phone === 'string' &&
    phone.trim().length === 11 ?
    phone.trim : false;

    const userMsg = typeof msg === 'string' &&
    msg.trim().length > 0 && msg.trim().length <= 1600 ?
    msg.trim() : false;

    if(userPhone && userMsg) {
        const payload = {
            From: twilo.fromPhone,
            To: `+880{userPhone}`,
            Body: userMsg,
        };

        //stringify the payload
        const stringifyPayload = querystring.stringify(payload)

        //configure the request details
        const requestDetails = {
            hostname : 'api.twilio.com',
            method : 'POST',
            path : `/2010-04-01/Accounts/{AccountSid}/Messages`,
            auth: `${twilo.accountSid} : ${twilo.authToken}`,
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
        };

        //instantiate the result object
        const req = https.request(requestDetails, (res) => {
            //get the status of the request
            const status = res.statusCode;
            // callback the request if the request went through
            if(status === 200 || status === 201) {
                callback(false);
            } else {
                callback(`Status code returned was ${status}`);
            }
        });

        req.on('error', (e) => {
            callback(e);
        })

        req.write(stringifyPayload);
        req.end();

    } else {
        callback('given parameters are missing or invalid');
    }
}


module.exports = notifications;