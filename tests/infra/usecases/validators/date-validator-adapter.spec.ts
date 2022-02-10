import validator from 'validator';
import { DateValidatorAdapter } from '@/infra/validators/date-validator-adapter';

jest.mock('validator', () => ({
  isDate(): boolean {
    return true;
  },
}));

const makeSut = () => new DateValidatorAdapter();

describe('DataValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut();

    jest.spyOn(validator, 'isDate').mockReturnValueOnce(false);

    const isValid = sut.isValid('invalid_date');

    expect(isValid).toBe(false);
  });

  test('Should return true if validator returns true', () => {
    const sut = makeSut();

    const isValid = sut.isValid('valid_date');

    expect(isValid).toBe(true);
  });

  test('Should call validator with correct date', () => {
    const sut = makeSut();

    const isValidSpy = jest.spyOn(validator, 'isDate');

    sut.isValid('any_date');

    expect(isValidSpy).toHaveBeenCalledWith('any_date');
  });
});
