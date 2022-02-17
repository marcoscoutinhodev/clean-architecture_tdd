import {
  LoadSurveyResultController,
} from '@/presentation/controllers/survey-result/load-survey-result/load-survey-result-controller';
import { HttpRequest } from '@/presentation/protocols';
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id';
import { mockLoadSurveyById } from '@/tests/presentation/mocks';

const mockRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id',
  },
});

type SutTypes = {
  sut: LoadSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById();
  const sut = new LoadSurveyResultController(loadSurveyByIdStub);

  return {
    sut,
    loadSurveyByIdStub,
  };
};

describe('LoadSurveyResult Controller', () => {
  test('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveyByIdStub, 'load');

    await sut.handle(mockRequest());

    expect(loadSpy).toHaveBeenCalledWith(mockRequest().params.surveyId);
  });
});
