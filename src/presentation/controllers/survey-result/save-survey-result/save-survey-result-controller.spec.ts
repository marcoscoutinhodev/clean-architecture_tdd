import { InvalidParamError } from '@/presentation/errors';
import { forbidden } from '@/presentation/helpers/http/http-helper';
import { SaveSurveyResultController } from './save-survey-result-controller';
import { HttpRequest, LoadSurveyById, SurveyModel } from './save-survey-result-controller-protocols';

const makeFakeRequest = (): HttpRequest => (
  {
    params: {
      surveyId: 'any_id',
    },
  }
);

const makeFakeSurvey = (): SurveyModel => (
  {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'image_link.com',
      answer: 'any_answer',
    }],
    date: new Date(),
  }
);

const makeLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async load(id: string): Promise<SurveyModel | null> {
      return makeFakeSurvey();
    }
  }

  return new LoadSurveyByIdStub();
};

type SutTypes = {
  sut: SaveSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = makeLoadSurveyById();
  const sut = new SaveSurveyResultController(loadSurveyByIdStub);

  return {
    sut,
    loadSurveyByIdStub,
  };
};

describe('SaveSurveyResultController', () => {
  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveyByIdStub, 'load');

    await sut.handle(makeFakeRequest());

    expect(loadSpy).toHaveBeenCalledWith(makeFakeRequest().params.surveyId);
  });

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest.spyOn(loadSurveyByIdStub, 'load').mockResolvedValueOnce(null);

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')));
  });
});
