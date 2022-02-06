import {
  ValidationComposite,
  RequiredFieldValidation,
  CompareFieldsValidation,
  EmailValidation,
  CpfValidation,
  DateValidation,
  PhoneNumberValidation,
} from '@/validation/validators';
import {
  CpfValidatorAdapter, DateValidatorAdapter, EmailValidatorAdapter, PhoneNumberValidatorAdapter,
} from '@/infra/validators';
import { Validation } from '@/presentation/protocols/validation';

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  const requiredFields = [
    'name', 'email', 'password', 'passwordConfirmation', 'cpf', 'birthdate', 'phoneNumber',
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
