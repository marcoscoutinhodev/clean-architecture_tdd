import { PhoneNumberValidatorAdapter } from './phone-number-validator-adapter';

describe('PhoneNumberValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new PhoneNumberValidatorAdapter();

    const isValid = sut.isValid('invalid_phone_number');

    expect(isValid).toBe(false);
  });
});
