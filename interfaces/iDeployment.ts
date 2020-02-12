export interface iDeployment{
    schemaVersion?: string,
    deploymentSequenceNumber: any,
    updateSequenceNumber: any,
    issueKeys: any [],
    displayName: string,
    url: string,
    description: string,
    lastUpdated: string,
    label: string,
    state: string,
    pipeline: {
        id: string,
        displayName: string,
        url: string,
    },
    environment: {
        id: string,
        displayName: string,
        type: string,
    }
}