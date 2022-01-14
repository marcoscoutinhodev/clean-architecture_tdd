import {
  ValidationComposite,
  RequiredFieldValidation,
  CompareFieldsValidation,
  EmailValidation,
  CpfValidation,
  DateValidation,
  PhoneNumberValidation,
} from '../../../presentation/helpers/validators';
import { Validation } from '../../../presentation/protocols/validation';
import {
  CpfValidatorAdapter, DateValidatorAdapter, EmailValidatorAdapter, PhoneNumberValidatorAdapter,
} from '../../../utils';

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
