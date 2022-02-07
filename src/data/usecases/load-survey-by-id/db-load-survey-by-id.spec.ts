import MockDate from 'mockdate';
import { DbLoadSurveyById } from './db-load-survey-by-id';
import { LoadSurveyByIdRepository, SurveyModel } from './db-load-survey-by-id-protocols';

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
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository,
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = makeLoadSurveyById();
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub);

  return {
    sut,
    loadSurveyByIdRepositoryStub,
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
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    const loadById = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');

    await sut.load('any_id');

    expect(loadById).toHaveBeenCalledWith('any_id');
  });

  test('Should return a Survey on success', async () => {
    const { sut } = makeSut();

    const survey = await sut.load('any_id');

    expect(survey).toEqual(makeFakeSurvey());
  });

  test('Should throw if  LoadSurveyByIdRepository throws', () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockRejectedValueOnce(new Error());

    const promise = sut.load('any_id');

    expect(promise).rejects.toThrow();
  });
});
