"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require('@actions/core');
const request = require('request-promise-native');
const dateFormat = require('dateformat');
const token = require('upload-build-upload-deployment-token-retrieval-logic');
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
    const deployment = {
        schemaVersion: "1.0",
        deploymentSequenceNumber: deploymentSequenceNumber || null,
        updateSequenceNumber: updateSequenceNumber || null,
        issueKeys: issueKeys.split(',') || [],
        displayName: displayName || "",
        url: url || "",
        description: description || "",
        lastUpdated: lastUpdated || "",
        label: label || "",
        state: state || "",
        pipeline: {
            id: pipelineId || "",
            displayName: pipelineDisplayName || "",
            url: pipelineUrl || ""
        },
        environment: {
            id: environmentId || "",
            displayName: environmentDisplayName || "",
            type: environmentType || ""
        }
    };
    let bodyData = {
        deployments: [deployment],
    };
    bodyData = JSON.stringify(bodyData);
    const options = {
        method: 'POST',
        url: "https://api.atlassian.com/jira/deployments/0.1/cloud/" + cloudId + "/bulk",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + accessToken
        },
        body: bodyData
    };
    let responseJson = await request(options);
    let response = JSON.parse(responseJson);
    if (response.rejectedDeployments && response.rejectedDeployments.length > 0) {
        const rejectedDeployment = response.rejectedDeployments[0];
        console.log("errors: ", rejectedDeployment.errors);
        let errors = rejectedDeployment.errors.map((error) => error.message).join(',');
        errors.substr(0, errors.length - 1);
        console.log("joined errors: ", errors);
        core.setFailed(errors);
    }
    core.setOutput("response", responseJson);
}
exports.submitDeploymentInfo = submitDeploymentInfo;
(async function () {
    try {
        const accessTokenResponse = await token.getAccessToken();
        console.log("accessTokenResponse: ", accessTokenResponse);
        await submitDeploymentInfo(accessTokenResponse.access_token);
        console.log("finished submitting deployment info");
    }
    catch (error) {
        core.setFailed(error.message);
    }
})();
