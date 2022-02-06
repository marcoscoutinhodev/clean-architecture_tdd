import { DateValidation } from './date-validation';
import { InvalidParamError } from '@/presentation/errors';
import { DateValidator } from '@/validation/protocols/date-validator';

const makeDateValidator = (): DateValidator => {
  class DateValidatorStub implements DateValidator {
    isValid(date: string): boolean {
      return true;
    }
  }

  return new DateValidatorStub();
};

type SutTypes = {
  sut: DateValidation
  dateValidatorStub: DateValidator
};

const makeSut = (): SutTypes => {
  const dateValidatorStub = makeDateValidator();
  const sut = new DateValidation('date', dateValidatorStub);

  return {
    sut,
    dateValidatorStub,
  };
};

describe('Date Validation', () => {
  test('Should return 400 if an invalid date is provided', () => {
    const { sut, dateValidatorStub } = makeSut();
    jest.spyOn(dateValidatorStub, 'isValid').mockReturnValueOnce(false);

    const error = sut.validate({ date: 'invalid_date' });

    expect(error).toEqual(new InvalidParamError('date'));
  });

  test('Should call DateValidator with correct date', () => {
    const { sut, dateValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(dateValidatorStub, 'isValid');

    sut.validate({ date: 'any_date' });

    expect(isValidSpy).toHaveBeenCalledWith('any_date');
  });

  test('Should throw if DateValidator throws', () => {
    const { sut, dateValidatorStub } = makeSut();

    jest.spyOn(dateValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });

    expect(sut.validate).toThrow();
  });
});
