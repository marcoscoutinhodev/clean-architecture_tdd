"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateValidation = void 0;
const errors_1 = require("../../errors");
class DateValidation {
    constructor(fieldName, dateValidator) {
        this.fieldName = fieldName;
        this.dateValidator = dateValidator;
    }
    validate(input) {
        const isValid = this.dateValidator.isValid(input[this.fieldName]);
        if (!isValid) {
            return new errors_1.InvalidParamError('date');
        }
        return null;
    }
}
exports.DateValidation = DateValidation;
