import { DbSaveSurveyResult } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result';
import { SaveSurveyResult } from '@/domain/usecases/survey-result/save-survey-result';
import { SurveyResultMongoRepository } from '@/infra/db';

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository();

  return new DbSaveSurveyResult(
    surveyResultMongoRepository,
    surveyResultMongoRepository,
  );
};
