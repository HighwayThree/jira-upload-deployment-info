const core = require('@actions/core');
const github = require('@actions/github');
const request = require('request-promise-native');
const dateFormat = require('dateformat');

var tokenBodyData = {
    "audience": "api.atlassian.com",
    "grant_type":"client_credentials",
    "client_id": '',
    "client_secret": ''
};

var tokenOptions = {
    method: 'POST',
    url: 'https://api.atlassian.com/oauth/token',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: {}
};

let deployment =
    {
        schemaVersion: "1.0",
        deploymentSequenceNumber: null,
        updateSequenceNumber: null,
        issueKeys: [],
        displayName: "",
        url: "",
        description: "",
        lastUpdated: "",
        label: "",
        state: "",
        pipeline: {
            id: "",
            displayName: "",
            url: ""
        },
        environment: {
            id: "",
            displayName: "",
            type: ""
        }
    };

let bodyData =
    {
        deployments: []
    };

let options = {
    method: 'POST',
    url: '',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: ''
    },
    body: {}
};

async function submitDeploymentInfo(accessToken) {
    const cloudId = core.getInput('cloud-id');
    const deploymentSequenceNumber = core.getInput('deployment-sequence-number');
    const updateSequenceNumber = core.getInput('update-sequence-number');
    const issueKeys = core.getInput('issue-keys');
    const displayName = core.getInput('display-name');
    const url = core.getInput('url');
    const description = core.getInput('description');
    let lastUpdated = core.getInput('last-updated');
    const label = core.getInput('label');
    const state = core.getInput('state');
    const pipelineId = core.getInput('pipeline-id');
    const pipelineDisplayName = core.getInput('pipeline-display-name');
    const pipelineUrl = core.getInput('pipeline-url');
    const environmentId = core.getInput('environment-id');
    const environmentDisplayName = core.getInput('environment-display-name');
    const environmentType = core.getInput('environment-type');

    console.log("lastUpdated: " + lastUpdated);
    lastUpdated = dateFormat(lastUpdated, "yyyy-mm-dd'T'HH:MM:ss'Z'");

    deployment.deploymentSequenceNumber = deploymentSequenceNumber;
    deployment.updateSequenceNumber = updateSequenceNumber;
    deployment.issueKeys = issueKeys.split(',');
    deployment.displayName = displayName;
    deployment.url = url;
    deployment.description = description;
    deployment.lastUpdated = lastUpdated;
    deployment.label = label;
    deployment.state = state;
    deployment.pipeline.id = pipelineId;
    deployment.pipeline.displayName = pipelineDisplayName;
    deployment.pipeline.url = pipelineUrl;
    deployment.environment.id = environmentId;
    deployment.environment.displayName = environmentDisplayName;
    deployment.environment.type = environmentType;

    bodyData.deployments = [deployment];
    bodyData = JSON.stringify(bodyData);
    // console.log("bodyData: " + bodyData);

    options.body = bodyData;
    options.url = "https://api.atlassian.com/jira/deployments/0.1/cloud/" + cloudId + "/bulk";
    options.headers.Authorization = "Bearer " + accessToken;

    // console.log("options: ", options);

    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);

    let responseJson = await request(options);
    console.log("responseJson: " + responseJson);
    response = JSON.parse(responseJson);

    if(response.rejectedDeployments && response.rejectedDeployments.length > 0) {
        const rejectedDeployment = response.rejectedDeployments[0];
        console.log("errors: ", rejectedDeployment.errors);
        let errors = rejectedDeployment.errors.map(error => error.message).join(',');
        errors.substr(0, errors.length - 1);
        console.log("joined errors: ", errors);
        core.setFailed(errors);
    }

    core.setOutput("response", responseJson);
}

async function getAccessToken() {
    const clientId = core.getInput('client-id');
    const clientSecret = core.getInput('client-secret');

    tokenBodyData.client_id = clientId;
    tokenBodyData.client_secret = clientSecret;
    tokenBodyData = JSON.stringify(tokenBodyData);
    tokenOptions.body = tokenBodyData;
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);

    console.log("tokenOptions: ", tokenOptions);
    const response = await request(tokenOptions);
    console.log("getAccessToken response: ", response);
    return JSON.parse(response);
}


(async function () {
    try {
        const accessTokenResponse = await getAccessToken();
        console.log("accessTokenResponse: ", accessTokenResponse);
        await submitDeploymentInfo(accessTokenResponse.access_token);
        console.log("finished submitting deployment info");
    } catch (error) {
        core.setFailed(error.message);
    }
})();
