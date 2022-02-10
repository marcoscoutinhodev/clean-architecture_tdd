import MockDate from 'mockdate';
import { mockLoadSurveyByIdRepository } from '@/tests/data/mocks';
import { DbLoadSurveyById } from '@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id';
import { LoadSurveyByIdRepository } from '@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id-protocols';
import { mockSurveyModel } from '@/tests/domain/mocks';

type SutTypes = {
  sut: DbLoadSurveyById,
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository,
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository();
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

    expect(survey).toEqual(mockSurveyModel());
  });

  test('Should throw if  LoadSurveyByIdRepository throws', () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockRejectedValueOnce(new Error());

    const promise = sut.load('any_id');

    expect(promise).rejects.toThrow();
  });
});
