import { CompareFieldsValidation } from './compare-fields-validation';
import { InvalidParamError } from '@/presentation/errors';

const makeSut = (): CompareFieldsValidation => new CompareFieldsValidation('field', 'fieldToCompare');

describe('CompareFields Validation', () => {
  test('Should return an InvalidParamError if validation fails', () => {
    const sut = makeSut();
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'wrong_value',
    });

    expect(error).toEqual(new InvalidParamError('fieldToCompare'));
  });

  test('Should return null if validation succeeds', () => {
    const sut = makeSut();
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'any_value',
    });

    expect(error).toBeNull();
  });
});
