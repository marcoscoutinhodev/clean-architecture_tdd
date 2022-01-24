import { makeSignUpValidation } from './signup-validation-factory';
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
import { EmailValidator } from '../../../presentation/protocols/email-validator';
import { CpfValidator } from '../../../presentation/protocols/cpf-validator';
import { DateValidator } from '../../../presentation/protocols/date-validator';
import { PhoneNumberValidator } from '../../../presentation/protocols/phone-number-validator';

jest.mock('../../../presentation/helpers/validators/validation-composite');

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

const makeCpfValidator = (): CpfValidator => {
  class CpfValidatorStub implements CpfValidator {
    isValid(cpf: string): boolean {
      return true;
    }
  }

  return new CpfValidatorStub();
};

const makeDateValidator = (): DateValidator => {
  class DateValidatorStub implements DateValidator {
    isValid(cpf: string): boolean {
      return true;
    }
  }

  return new DateValidatorStub();
};

const makePhoneNumberValidator = (): PhoneNumberValidator => {
  class PhoneNumberValidatorStub implements PhoneNumberValidator {
    isValid(cpf: string): boolean {
      return true;
    }
  }

  return new PhoneNumberValidatorStub();
};

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
      'rg',
      'birthdate',
      'phoneNumber',
    ];

    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field));
    }

    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
    validations.push(new EmailValidation('email', makeEmailValidator()));
    validations.push(new CpfValidation('cpf', makeCpfValidator()));
    validations.push(new DateValidation('birthdate', makeDateValidator()));
    validations.push(new PhoneNumberValidation('phoneNumber', makePhoneNumberValidator()));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
