"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const debug_1 = __importDefault(require("../debug"));
describe('debug action debug messages', () => {
    it('outputs a debug message', async () => {
        const debugMock = jest.spyOn(core, 'debug');
        await debug_1.default();
        expect(debugMock).toHaveBeenCalledWith('👋 Hello! You are an amazing person! 🙌');
    });
});
