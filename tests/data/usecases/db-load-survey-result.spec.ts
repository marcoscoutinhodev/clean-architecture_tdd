import { DbLoadSurveyResult } from '@/data/usecases/survey-result/load-survey-result/db-load-survey-result';
import { LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository';
import { mockSurveyResultModel } from '@/tests/domain/mocks';
import { SurveyResultModel } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-protocols';

describe('DbLoadSurveyResult UseCase', () => {
  test('Should call LoadSurveyResultRepository with correct value', async () => {
    class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
      async loadBySurveyId(surveyId: string): Promise<SurveyResultModel> {
        return mockSurveyResultModel();
      }
    }
    const loadSurveyResultRepositoryStub = new LoadSurveyResultRepositoryStub();
    const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub);
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId');

    await sut.load('any_survey_id');

    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id');
  });
});
