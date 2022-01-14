import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite';
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation';
import { Validation } from '../../../presentation/protocols/validation';
import { CompareFieldsValidation } from '../../../presentation/helpers/validators/compare-fields-validation';
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation';
import {
  CpfValidatorAdapter, DateValidatorAdapter, EmailValidatorAdapter, PhoneNumberValidatorAdapter,
} from '../../../utils';
import { CpfValidation } from '../../../presentation/helpers/validators/cpf-validation';
import { DateValidation } from '../../../presentation/helpers/validators/date-validation';
import { PhoneNumberValidation } from '../../../presentation/helpers/validators/phone-number-validation';

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  const requiredFields = [
    'name', 'email', 'password', 'passwordConfirmation', 'cpf', 'rg', 'birthdate', 'phoneNumber',
  ];

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field));
  }

  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  validations.push(new CpfValidation('cpf', new CpfValidatorAdapter()));
  validations.push(new DateValidation('birthdate', new DateValidatorAdapter()));
  validations.push(new PhoneNumberValidation('phoneNumber', new PhoneNumberValidatorAdapter()));

  return new ValidationComposite(validations);
};
