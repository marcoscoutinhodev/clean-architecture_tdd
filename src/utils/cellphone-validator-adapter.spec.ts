import { CellphoneValidatorAdapter } from './cellphone-validator-adapter';

describe('CellphoneValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new CellphoneValidatorAdapter();

    const isValid = sut.isValid('invalid_cellphone');

    expect(isValid).toBe(false);
  });
});
