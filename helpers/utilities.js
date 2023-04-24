
//module scaffolding
const crypto = require('crypto');
const environments = require('./environments');
const utilities = {};

//parse JSON string to object
utilities.parseJSON = (jsonString) => {
    let object;
    try {
        object = JSON.parse(jsonString);
    } catch {
        object = {};
    }
    return object;
}

//hash string
utilities.hash = (str) => {
    if  (typeof str === 'string' && str.length > 0) {
        console.log(environments.secretKey);
        const hash = crypto.createHmac('sha256', environments.secretKey)
        .update('str')
        .digest('hex')
        return hash;
    }
    return false;
}

//random string generate
utilities.createRandomString = (strLength) => {
    let length = strLength;
    length = strLength === 'number' && strLength > 0 ? strLength : false;

    if(length) {
        let possibleCharacters = 'abcdefghijklmnopqrstuvwxyz1234567890';
        let output = '';
        for(let i = 1; i <= length; i++) {
            
            const result= possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
            output += result;
        }
        return output;
    }
    
}
  
module.exports = utilities;