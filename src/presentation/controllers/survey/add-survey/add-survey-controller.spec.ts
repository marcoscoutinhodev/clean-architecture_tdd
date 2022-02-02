import { AddSurveyController } from './add-survey-controller';
import { HttpRequest, HttpResponse, Validation } from './add-survey-controller-protocols';

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer',
    }],
  },
});

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): null | Error {
      return null;
    }
  }

  return new ValidationStub();
};

describe('AddSurvey Controller', () => {
  test('Should call Validation with correct values', async () => {
    const validationStub = makeValidationStub();
    const sut = new AddSurveyController(validationStub);
    const httpRequest = makeFakeRequest();
    const validateSpy = jest.spyOn(validationStub, 'validate');

    await sut.handle(httpRequest);

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
