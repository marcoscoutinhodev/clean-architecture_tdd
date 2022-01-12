import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite';
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation';
import { Validation } from '../../presentation/helpers/validators/validation';

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  const requiredFields = [
    'name', 'email', 'password', 'passwordConfirmation', 'cpf', 'rg', 'birthdate', 'phoneNumber',
  ];

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field));
  }

  return new ValidationComposite(validations);
};
