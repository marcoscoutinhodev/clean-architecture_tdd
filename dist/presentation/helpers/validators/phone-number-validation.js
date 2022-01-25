"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneNumberValidation = void 0;
const errors_1 = require("../../errors");
class PhoneNumberValidation {
    constructor(fieldName, phoneNumberValidator) {
        this.fieldName = fieldName;
        this.phoneNumberValidator = phoneNumberValidator;
    }
    validate(input) {
        const isPhoneNumberValid = this.phoneNumberValidator.isValid(input[this.fieldName]);
        if (!isPhoneNumberValid) {
            return new errors_1.InvalidParamError(this.fieldName);
        }
        return null;
    }
}
exports.PhoneNumberValidation = PhoneNumberValidation;
