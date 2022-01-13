import { makeSignUpValidation } from './signup-validation';
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite';
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation';
import { Validation } from '../../presentation/helpers/validators/validation';
import { CompareFieldsValidation } from '../../presentation/helpers/validators/compare-fields-validation';

jest.mock('../../presentation/helpers/validators/validation-composite');

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation();
    const validations: Validation[] = [];
    const requiredFields = [
      'name',
      'email',
      'password',
      'passwordConfirmation',
      'cpf',
      'rg',
      'birthdate',
      'phoneNumber',
    ];

    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field));
    }

    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
