import { makeSignUpValidation } from './signup-validation-factory';
import {
  ValidationComposite,
  RequiredFieldValidation,
  CompareFieldsValidation,
  EmailValidation,
  CpfValidation,
  DateValidation,
  PhoneNumberValidation,
} from '@/validation/validators';
import { Validation } from '@/presentation/protocols/validation';
import {
  mockCpfValidator, mockDateValidator, mockEmailValidator, mockPhoneNumberValidator,
} from '@/validation/test';

jest.mock('@/validation/validators/validation-composite');

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation();
    const validations: Validation[] = [];
    const requiredFields = [
      'name',
      'email',
      'password',
      'passwordConfirmation',
      'cpf',
      'birthdate',
      'phoneNumber',
    ];

    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field));
    }

    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
    validations.push(new EmailValidation('email', mockEmailValidator()));
    validations.push(new CpfValidation('cpf', mockCpfValidator()));
    validations.push(new DateValidation('birthdate', mockDateValidator()));
    validations.push(new PhoneNumberValidation('phoneNumber', mockPhoneNumberValidator()));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
