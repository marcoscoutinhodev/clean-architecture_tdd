import MockDate from 'mockdate';
import { DbLoadSurveyById } from './db-load-survey-by-id';
import { SurveyModel } from '@/domain/models/survey';
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository';

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

const makeLoadSurveyById = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdStub implements LoadSurveyByIdRepository {
    async loadById(id: string): Promise<SurveyModel> {
      return makeFakeSurvey();
    }
  }

  return new LoadSurveyByIdStub();
};

type SutTypes = {
  sut: DbLoadSurveyById,
  loadSurveyByIdRepositorystub: LoadSurveyByIdRepository,
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositorystub = makeLoadSurveyById();
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositorystub);

  return {
    sut,
    loadSurveyByIdRepositorystub,
  };
};

describe('DbLoadSurveyById UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositorystub } = makeSut();
    const loadById = jest.spyOn(loadSurveyByIdRepositorystub, 'loadById');

    await sut.load('any_id');

    expect(loadById).toHaveBeenCalledWith('any_id');
  });
});
