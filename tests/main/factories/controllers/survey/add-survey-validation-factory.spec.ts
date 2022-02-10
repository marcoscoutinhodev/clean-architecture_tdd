import { makeAddSurveyValidation } from '@/main/factories/controllers/survey/add-survey';
import {
  ValidationComposite,
  RequiredFieldValidation,
} from '@/validation/validators';
import { Validation } from '@/presentation/protocols/validation';

jest.mock('@/validation/validators/validation-composite');

describe('AddSurveyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation();
    const validations: Validation[] = [];
    const requiredFields = [
      'question',
      'answers',
    ];

    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field));
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
