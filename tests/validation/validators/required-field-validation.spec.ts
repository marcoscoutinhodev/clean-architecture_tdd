import { RequiredFieldValidation } from '@/validation/validators/required-field-validation';
import { MissingParamError } from '@/presentation/errors';

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
