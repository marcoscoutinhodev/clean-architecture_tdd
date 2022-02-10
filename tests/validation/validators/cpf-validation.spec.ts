import { CpfValidation } from '@/validation/validators/cpf-validation';
import { InvalidParamError } from '@/presentation/errors';
import { CpfValidator } from '@/validation/protocols/cpf-validator';
import { mockCpfValidator } from '@/tests/validation/mocks';

type SutTypes = {
  sut: CpfValidation
  cpfValidatorStub: CpfValidator
};

const makeSut = (): SutTypes => {
  const cpfValidatorStub = mockCpfValidator();
  const sut = new CpfValidation('cpf', cpfValidatorStub);

  return {
    sut,
    cpfValidatorStub,
  };
};

describe('Cpf Validation', () => {
  test('Should return 400 if cpf provided is invalid', () => {
    const { sut, cpfValidatorStub } = makeSut();
    jest.spyOn(cpfValidatorStub, 'isValid').mockReturnValueOnce(false);

    const error = sut.validate({ cpf: 'any_cpf' });

    expect(error).toEqual(new InvalidParamError('cpf'));
  });

  test('Should call CpfValidator with correct cpf', () => {
    const { sut, cpfValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(cpfValidatorStub, 'isValid');

    sut.validate({ cpf: 'any_cpf' });

    expect(isValidSpy).toHaveBeenCalledWith('any_cpf');
  });

  test('Should return 500 is CpfValidator throws', () => {
    const { sut, cpfValidatorStub } = makeSut();
    jest.spyOn(cpfValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });

    expect(sut.validate).toThrow();
  });
});
