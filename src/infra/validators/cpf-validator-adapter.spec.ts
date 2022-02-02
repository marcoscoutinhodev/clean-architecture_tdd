import { CpfValidatorAdapter } from './cpf-validator-adapter';

describe('CpfValidator Adapter', () => {
  const sut = new CpfValidatorAdapter();

  beforeAll(() => {
    jest.spyOn(sut, 'isValid').mockImplementation(() => true);
  });

  test('Should return false if validator returns false', () => {
    jest.spyOn(sut, 'isValid').mockReturnValueOnce(false);

    const isValid = sut.isValid('invalid_cpf');

    expect(isValid).toBe(false);
  });

  test('Should return true if validator returns true', () => {
    const isValid = sut.isValid('valid_cpf');

    expect(isValid).toBe(true);
  });

  test('Should call validator with correct cpf', () => {
    const isValidSpy = jest.spyOn(sut, 'isValid');

    sut.isValid('any_cpf');

    expect(isValidSpy).toHaveBeenCalledWith('any_cpf');
  });
});
