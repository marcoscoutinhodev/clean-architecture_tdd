"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignUpValidation = void 0;
const validators_1 = require("../../../presentation/helpers/validators");
const utils_1 = require("../../../utils");
const makeSignUpValidation = () => {
    const validations = [];
    const requiredFields = [
        'name', 'email', 'password', 'passwordConfirmation', 'cpf', 'rg', 'birthdate', 'phoneNumber',
    ];
    for (const field of requiredFields) {
        validations.push(new validators_1.RequiredFieldValidation(field));
    }
    validations.push(new validators_1.CompareFieldsValidation('password', 'passwordConfirmation'));
    validations.push(new validators_1.EmailValidation('email', new utils_1.EmailValidatorAdapter()));
    validations.push(new validators_1.CpfValidation('cpf', new utils_1.CpfValidatorAdapter()));
    validations.push(new validators_1.DateValidation('birthdate', new utils_1.DateValidatorAdapter()));
    validations.push(new validators_1.PhoneNumberValidation('phoneNumber', new utils_1.PhoneNumberValidatorAdapter()));
    return new validators_1.ValidationComposite(validations);
};
exports.makeSignUpValidation = makeSignUpValidation;
