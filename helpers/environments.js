//dependencies

//module scaffolding
const environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: 'fjeijfelsldflmsldfiri',
    maxchecks : 5,
    twilo : {
        fromPhone: '',
        accountSid: '',
        authToken: '',
    }
};

environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'kncndfnrfrnfdfdgn',
    maxchecks : 5,
    twilo : {
        fromPhone: '++15017122661',
        accountSid: 'AC0ceb93cda507e835689db8ab29e31584',
        authToken: '56e74109a95e6757fc7c0d9fd35e7c45',
    }
}

//determine which environment was passed
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment object
const environmentsToExport = typeof environments[currentEnvironment] === 'object'
                         ?  environments[currentEnvironment]
                         :  environments.staging;

module.exports = environmentsToExport;
