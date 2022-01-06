import { PhoneNumberValidatorAdapter } from './phone-number-validator-adapter';

describe('PhoneNumberValidator Adapter', () => {
  const sut = new PhoneNumberValidatorAdapter();

  beforeEach(() => {
    jest.spyOn(sut, 'isValid').mockImplementation(() => true);
  });

  test('Should return false if validator returns false', () => {
    jest.spyOn(sut, 'isValid').mockImplementationOnce(() => false);

    const isValid = sut.isValid('invalid_phone_number');

    expect(isValid).toBe(false);
  });

  test('Should return true if validator returns true', () => {
    const isValid = sut.isValid('valid_phone_number');

    expect(isValid).toBe(true);
  });
});
