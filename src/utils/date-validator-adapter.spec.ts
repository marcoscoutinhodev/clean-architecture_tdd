import validator from 'validator';
import { DateValidatorAdapter } from './date-validator-adapter';

jest.mock('validator', () => ({
  isDate(): boolean {
    return true;
  },
}));

describe('DataValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new DateValidatorAdapter();

    jest.spyOn(validator, 'isDate').mockReturnValueOnce(false);

    const isValid = sut.isValid('invalid_date');

    expect(isValid).toBe(false);
  });

  test('Should return true if validator returns true', () => {
    const sut = new DateValidatorAdapter();

    const isValid = sut.isValid('valid_date');

    expect(isValid).toBe(true);
  });
});
