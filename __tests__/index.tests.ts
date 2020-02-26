import nock from 'nock'
import {submitDeploymentInfo} from "../index";

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
})