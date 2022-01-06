import { DateValidatorAdapter } from './date-validator-adapter';

describe('DataValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new DateValidatorAdapter();

    const isValid = sut.isValid('invalid_date');

    expect(isValid).toBe(false);
  });
});
