import { CpfValidatorAdapter } from './cpf-validator-adapter';

describe('CpfValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new CpfValidatorAdapter();

    const isValid = sut.isValid('invalid_cpf');

    expect(isValid).toBe(false);
  });
});
