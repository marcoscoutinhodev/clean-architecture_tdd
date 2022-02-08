import MockDate from 'mockdate';
import { SaveSurveyResultModel, SaveSurveyResultRepository, SurveyResultModel } from './db-save-survey-protocols';
import { DbSaveSurveyResult } from './db-save-survey-result';

const makeFakeSurveyResultData = (): SaveSurveyResultModel => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_question',
  date: new Date(),
});

const makeFakeSurveyResult = (): SurveyResultModel => ({
  id: 'any_id',
  ...makeFakeSurveyResultData(),
});

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return new Promise((resolve) => { resolve(makeFakeSurveyResult()); });
    }
  }

  return new SaveSurveyResultRepositoryStub();
};

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
};

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository();
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
    const surveyResultData = makeFakeSurveyResultData();

    await sut.save(surveyResultData);

    expect(saveSpy).toHaveBeenCalledWith(surveyResultData);
  });

  test('Should return SurveyResult on success', async () => {
    const { sut } = makeSut();

    const surveyResult = await sut.save(makeFakeSurveyResultData());

    expect(surveyResult).toEqual(makeFakeSurveyResult());
  });

  test('Should throw if SaveSurveyResultRepository throws', () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockRejectedValueOnce(new Error());

    const promise = sut.save(makeFakeSurveyResultData());

    expect(promise).rejects.toThrow();
  });
});
