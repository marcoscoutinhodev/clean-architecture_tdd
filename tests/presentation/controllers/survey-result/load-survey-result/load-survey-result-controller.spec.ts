import {
  LoadSurveyResultController,
} from '@/presentation/controllers/survey-result/load-survey-result/load-survey-result-controller';
import { HttpRequest } from '@/presentation/protocols';
import { mockLoadSurveyById } from '@/tests/presentation/mocks';

const mockRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id',
  },
});

describe('LoadSurveyResult Controller', () => {
  test('Should call LoadSurveyById with correct value', async () => {
    const loadSurveyByIdStub = mockLoadSurveyById();
    const sut = new LoadSurveyResultController(loadSurveyByIdStub);
    const loadSpy = jest.spyOn(loadSurveyByIdStub, 'load');

    await sut.handle(mockRequest());

    expect(loadSpy).toHaveBeenCalledWith(mockRequest().params.surveyId);
  });
});
