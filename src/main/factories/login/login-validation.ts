import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite';
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation';
import { Validation } from '../../../presentation/protocols/validation';
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation';
import { EmailValidatorAdapter } from '../../../utils';

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  const requiredFields = [
    'email', 'password',
  ];

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field));
  }

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));

  return new ValidationComposite(validations);
};
