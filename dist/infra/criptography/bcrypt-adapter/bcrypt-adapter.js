"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcrypAdapter = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class BcrypAdapter {
    constructor(salt) {
        this.salt = salt;
    }
    async hash(password) {
        const hash = await bcrypt_1.default.hash(password, this.salt);
        return hash;
    }
    async compare(value, hash) {
        const isValid = await bcrypt_1.default.compare(value, hash);
        return isValid;
    }
}
exports.BcrypAdapter = BcrypAdapter;
