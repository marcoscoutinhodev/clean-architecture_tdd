import { PhoneNumberValidation } from './phone-number-validation';
import { PhoneNumberValidator } from '../protocols/phone-number-validator';
import { InvalidParamError } from '../../presentation/errors';

const makePhoneNumberValidator = (): PhoneNumberValidator => {
  class PhoneNumberValidationStub implements PhoneNumberValidator {
    isValid(phoneNumber: string): boolean {
      return true;
    }
  }

  return new PhoneNumberValidationStub();
};

interface SutTypes {
  sut: PhoneNumberValidation,
  phoneNumberValidatorStub: PhoneNumberValidator
}

const makeSut = (): SutTypes => {
  const phoneNumberValidatorStub = makePhoneNumberValidator();
  const sut = new PhoneNumberValidation('phoneNumber', phoneNumberValidatorStub);

  return {
    sut,
    phoneNumberValidatorStub,
  };
};

test('Should return 400 if phoneNumber provided is invalid', () => {
  const { sut, phoneNumberValidatorStub } = makeSut();

  jest.spyOn(phoneNumberValidatorStub, 'isValid').mockReturnValueOnce(false);

  const httpResponse = sut.validate({ phoneNumber: 'invalid_phone_number' });

  expect(httpResponse).toEqual(new InvalidParamError('phoneNumber'));
});

test('Should call PhoneNumberValidator with correct phoneNumber', () => {
  const { sut, phoneNumberValidatorStub } = makeSut();

  const isValidSpy = jest.spyOn(phoneNumberValidatorStub, 'isValid');

  sut.validate({ phoneNumber: 'any_phone_number' });

  expect(isValidSpy).toHaveBeenCalledWith('any_phone_number');
});

test('Should return 500 if PhoneNumberValidator throws', () => {
  const { sut, phoneNumberValidatorStub } = makeSut();

  jest.spyOn(phoneNumberValidatorStub, 'isValid').mockImplementationOnce(() => {
    throw new Error();
  });

  expect(sut.validate).toThrow();
});
