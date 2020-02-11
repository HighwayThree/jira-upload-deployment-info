"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as core from '@actions/core'
const nock_1 = __importDefault(require("nock"));
const index_1 = __importDefault(require("../index"));
const index_2 = __importDefault(require("../index"));
beforeEach(() => {
    jest.resetModules();
});
afterAll(() => {
    expect(nock_1.default.pendingMocks()).toEqual([]);
    nock_1.default.isDone();
    nock_1.default.cleanAll();
});
describe('debug action debug messages', () => {
    it('testing submitDeploymentInfo, no access token, expecting it to throw a reject', async () => {
        await expect(index_1.default()).rejects.toThrow();
    });
    it('testing getAccessTokent', async () => {
        await expect(index_2.default()).rejects.toThrow();
    });
    // it('spy on getInput', async () => {
    // })
});
