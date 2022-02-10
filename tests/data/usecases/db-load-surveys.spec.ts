import MockDate from 'mockdate';
import { DbLoadSurveys } from '@/data/usecases/survey/load-surveys/db-load-surveys';
import { LoadSurveysRepository } from '@/data/usecases/survey/load-surveys/db-load-surveys-protocols';
import { mockLoadSurveysRepository } from '@/tests/data/mocks';
import { mockSurveyModels } from '@/tests/domain/mocks';

type SutTypes = {
  sut: DbLoadSurveys,
  loadSurveysRepositoryStub: LoadSurveysRepository,
};

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepository();
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub);

  return {
    sut,
    loadSurveysRepositoryStub,
  };
};

describe('DbLoadSurveys UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');

    await sut.load();

    expect(loadAllSpy).toHaveBeenCalled();
  });

  test('Should return a list of Surveys on success', async () => {
    const { sut } = makeSut();

    const surveys = await sut.load();

    expect(surveys).toEqual(mockSurveyModels());
  });

  test('Should throw if LoadSurveysRepository throws', () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockRejectedValueOnce(new Error());

    const promise = sut.load();

    expect(promise).rejects.toThrow();
  });
});
