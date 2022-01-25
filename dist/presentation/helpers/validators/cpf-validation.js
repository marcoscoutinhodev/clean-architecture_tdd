"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CpfValidation = void 0;
const errors_1 = require("../../errors");
class CpfValidation {
    constructor(fieldName, cpfValidator) {
        this.fieldName = fieldName;
        this.cpfValidator = cpfValidator;
    }
    validate(input) {
        const isValid = this.cpfValidator.isValid(input[this.fieldName]);
        if (!isValid) {
            return new errors_1.InvalidParamError('cpf');
        }
        return null;
    }
}
exports.CpfValidation = CpfValidation;
