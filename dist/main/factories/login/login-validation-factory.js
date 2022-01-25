"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoginValidation = void 0;
const validators_1 = require("../../../presentation/helpers/validators");
const utils_1 = require("../../../utils");
const makeLoginValidation = () => {
    const validations = [];
    const requiredFields = [
        'email', 'password',
    ];
    for (const field of requiredFields) {
        validations.push(new validators_1.RequiredFieldValidation(field));
    }
    validations.push(new validators_1.EmailValidation('email', new utils_1.EmailValidatorAdapter()));
    return new validators_1.ValidationComposite(validations);
};
exports.makeLoginValidation = makeLoginValidation;
