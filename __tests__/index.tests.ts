// import * as core from '@actions/core'
import nock from 'nock'
import submitDeploymentInfo from "../index";
import getAccessToken from "../index";

 beforeEach( () => {
  jest.resetModules();
})

afterAll( () => {
expect(nock.pendingMocks()).toEqual([])
nock.isDone()
nock.cleanAll()
})


describe('debug action debug messages', () => {
  it('testing submitDeploymentInfo, no access token, expecting it to throw a reject', async () => {
     await expect(submitDeploymentInfo()).rejects.toThrow();
  })
  it('testing getAccessTokent', async () => {
    await expect(getAccessToken()).rejects.toThrow();
  })
  // it('spy on getInput', async () => {
    
  // })
})