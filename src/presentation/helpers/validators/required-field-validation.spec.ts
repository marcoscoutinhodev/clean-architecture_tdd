import { MissingParamError } from '../../errors';
import { RequiredFieldValidation } from './required-field-validation';

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation('field');

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut();
    const error = sut.validate({ any: 'any' });

    expect(error).toEqual(new MissingParamError('field'));
  });

  test('Should return null if validation succeeds', () => {
    const sut = makeSut();
    const error = sut.validate({ field: 'any_field' });

    expect(error).toBeNull();
  });
});
