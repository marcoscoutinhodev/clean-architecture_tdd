import { CpfValidatorAdapter } from './cpf-validator-adapter';

describe('CpfValidator Adapter', () => {
  const sut = new CpfValidatorAdapter();

  test('Should call validator with correct cpf', () => {
    const isValidSpy = jest.spyOn(sut, 'isValid');

    sut.isValid('any_cpf');

    expect(isValidSpy).toHaveBeenCalledWith('any_cpf');
  });

  test('Should return false if cpf length is not 11', () => {
    const isValid = sut.isValid('123');
    expect(isValid).toBe(false);
  });

  test('Should return false if the calculations fails', () => {
    let isValid = sut.isValid('000.000.000.10');
    expect(isValid).toBe(false);

    isValid = sut.isValid('000.000.000.01');
    expect(isValid).toBe(false);
  });

  test('Should return true if the calculation succeeds', () => {
    const isValid = sut.isValid('123.456.789.09');
    expect(isValid).toBe(true);
  });
});
