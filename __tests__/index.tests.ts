import * as core from '@actions/core'
import nock from 'nock'
import {submitDeploymentInfo, getAccessToken} from "../index";

 beforeEach( () => {
  jest.resetModules();
})

afterAll( () => {
expect(nock.pendingMocks()).toEqual([])
nock.isDone()
nock.cleanAll()
})


describe('debug action debug messages', () => {
  it('testing submitDeploymentInfo, no real access token', async () => {
    const fakeToken = ''; 
    await expect(submitDeploymentInfo(fakeToken)).rejects.toThrow();
  })
  it('testing getAccessTokent, no spyOn', async () => {
    await expect(getAccessToken()).rejects.toThrow();
  })
  it('spy on getInput', async () => {
    const gettingInputs = jest.spyOn(core, 'getInput').mockImplementation((name: string): string => {
      if (name === 'client-id') return 'client-id'
      if (name === 'client-secret') return 'client-secret'
      return ''
    });
    await expect(getAccessToken()).rejects.toThrow();
    expect(gettingInputs.mock.results.length).toBe(2);
  })
    // it('spy on getInput', async () => {
    
  // })
})