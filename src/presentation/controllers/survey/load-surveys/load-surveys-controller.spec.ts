import { LoadSurveysController } from './load-surveys-controller';
import { LoadSurveys, SurveyModel } from './load-surveys-controller-protocols';

const makeFakeSurveys = (): SurveyModel[] => ([
  {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'image_link.com',
      answer: 'any_answer',
    }],
    date: new Date(),
  },
  {
    id: 'other_id',
    question: 'other_question',
    answers: [{
      image: 'image_link.com',
      answer: 'other_answer',
    },
    {
      answer: 'other_answer',
    }],
    date: new Date(),
  },
]);

const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return makeFakeSurveys();
    }
  }

  return new LoadSurveysStub();
};

interface SutTypes {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = makeLoadSurveys();
  const sut = new LoadSurveysController(loadSurveysStub);

  return {
    sut,
    loadSurveysStub,
  };
};

describe('LoadSurveys Controller', () => {
  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveysStub, 'load');

    await sut.handle({});

    expect(loadSpy).toHaveBeenCalled();
  });
});
