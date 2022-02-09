import MockDate from 'mockdate';
import { SaveSurveyResultRepository } from './db-save-survey-protocols';
import { DbSaveSurveyResult } from './db-save-survey-result';
import { mockSaveSurveyResultParams, mockSurveyResultModel } from '@/domain/test';
import { mockSaveSurveyResultRepository } from '@/data/test';

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
};

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository();
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub);

  return {
    sut,
    saveSurveyResultRepositoryStub,
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

  test('Should return SurveyResult on success', async () => {
    const { sut } = makeSut();

    const surveyResult = await sut.save(mockSaveSurveyResultParams());

    expect(surveyResult).toEqual(mockSurveyResultModel());
  });

  test('Should throw if SaveSurveyResultRepository throws', () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockRejectedValueOnce(new Error());

    const promise = sut.save(mockSaveSurveyResultParams());

    expect(promise).rejects.toThrow();
  });
});
