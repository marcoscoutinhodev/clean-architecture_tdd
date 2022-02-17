import MockDate from 'mockdate';
import { DbSaveSurveyResult } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result';
import { SaveSurveyResultRepository } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-protocols';
import { LoadSurveyResultRepository } from '@/data/usecases/survey-result/load-survey-result/db-load-survey-protocols';
import { mockLoadSurveyResultRepository, mockSaveSurveyResultRepository } from '@/tests/data/mocks';
import { mockSaveSurveyResultParams, mockSurveyResultModel } from '@/tests/domain/mocks';

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
};

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository();
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository();
  const sut = new DbSaveSurveyResult(
    saveSurveyResultRepositoryStub,
    loadSurveyResultRepositoryStub,
  );

  return {
    sut,
    saveSurveyResultRepositoryStub,
    loadSurveyResultRepositoryStub,
  };
};

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save');
    const surveyResultData = mockSaveSurveyResultParams();

    await sut.save(surveyResultData);

    expect(saveSpy).toHaveBeenCalledWith(surveyResultData);
  });

  test('Should throw if SaveSurveyResultRepository throws', () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockRejectedValueOnce(new Error());

    const promise = sut.save(mockSaveSurveyResultParams());

    expect(promise).rejects.toThrow();
  });

  test('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId');
    const surveyResultData = mockSaveSurveyResultParams();

    await sut.save(surveyResultData);

    expect(loadBySurveyIdSpy).toHaveBeenCalledWith(surveyResultData.surveyId);
  });

  test('Should throw if LoadSurveyResultRepository throws', () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockRejectedValueOnce(new Error());

    const promise = sut.save(mockSaveSurveyResultParams());

    expect(promise).rejects.toThrow();
  });

  test('Should return SurveyResult on success', async () => {
    const { sut } = makeSut();

    const surveyResult = await sut.save(mockSaveSurveyResultParams());

    expect(surveyResult).toEqual(mockSurveyResultModel());
  });
});
