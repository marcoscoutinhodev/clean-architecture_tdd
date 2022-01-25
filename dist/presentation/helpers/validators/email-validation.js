"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailValidation = void 0;
const errors_1 = require("../../errors");
class EmailValidation {
    constructor(fieldName, emailValidator) {
        this.fieldName = fieldName;
        this.emailValidator = emailValidator;
    }
    validate(input) {
        const isEmailValid = this.emailValidator.isValid(input[this.fieldName]);
        if (!isEmailValid) {
            return new errors_1.InvalidParamError(this.fieldName);
        }
        return null;
    }
}
exports.EmailValidation = EmailValidation;
