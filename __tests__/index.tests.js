"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
});
