const request = require('request-promise-native');

var exports = module.exports={};

exports.getAccessToken = async function (clientId, clientSecret) {

    let tokenBodyData = {
        "audience": "api.atlassian.com",
        "grant_type":"client_credentials",
        "client_id": clientId || "",
        "client_secret": clientSecret || "",
    };
    tokenBodyData = JSON.stringify(tokenBodyData);
    
    const tokenOptions = {
        method: 'POST',
        url: 'https://api.atlassian.com/oauth/token',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: tokenBodyData,
    };
    console.log("tokenOptions: ", tokenOptions);
    const response = await request(tokenOptions);
    console.log("getAccessToken response: ", response);
    return JSON.parse(response);
};