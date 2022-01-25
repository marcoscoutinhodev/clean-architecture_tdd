"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompareFieldsValidation = void 0;
const errors_1 = require("../../errors");
class CompareFieldsValidation {
    constructor(fieldName, fieldNameToCompare) {
        this.fieldName = fieldName;
        this.fieldNameToCompare = fieldNameToCompare;
    }
    validate(input) {
        if (input[this.fieldName] !== input[this.fieldNameToCompare]) {
            return new errors_1.InvalidParamError(this.fieldNameToCompare);
        }
        return null;
    }
}
exports.CompareFieldsValidation = CompareFieldsValidation;
