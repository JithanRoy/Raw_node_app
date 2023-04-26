//dependencies

//module scaffolding
const environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: 'fjeijfelsldflmsldfiri',
    maxchecks : 5
};

environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'kncndfnrfrnfdfdgn',
    maxchecks : 5
}

//determine which environment was passed
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment object
const environmentsToExport = typeof environments[currentEnvironment] === 'object'
                         ?  environments[currentEnvironment]
                         :  environments.staging;

module.exports = environmentsToExport;
