"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as core from '@actions/core'
const nock_1 = __importDefault(require("nock"));
const index_1 = require("../index");
beforeEach(() => {
    jest.resetModules();
});
afterAll(() => {
    expect(nock_1.default.pendingMocks()).toEqual([]);
    nock_1.default.isDone();
    nock_1.default.cleanAll();
});
describe('debug action debug messages', () => {
    it('testing submitDeploymentInfo, no real access token', async () => {
        const fakeToken = '';
        await expect(index_1.submitDeploymentInfo(fakeToken)).rejects.toThrow();
    });
    // it('testing getAccessTokent, no spyOn', async () => {
    //   await expect(getAccessToken()).rejects.toThrow();
    // })
    // it('spy on getInput', async () => {
    //   const gettingInputs = jest.spyOn(core, 'getInput').mockImplementation((name: string): string => {
    //     if (name === 'client-id') return 'client-id'
    //     if (name === 'client-secret') return 'client-secret'
    //     return ''
    //   });
    //   await expect(getAccessToken()).rejects.toThrow();
    //   expect(gettingInputs.mock.results.length).toBe(2);
    // })
    // it('spy on getInput', async () => {
    // })
});
