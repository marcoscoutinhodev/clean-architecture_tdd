import { SurveyResultModel } from '@/domain/models/survey-result';
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result';

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_question',
  date: new Date(),
});

export const mockSurveyResultModel = (): SurveyResultModel => ({
  id: 'any_id',
  ...mockSaveSurveyResultParams(),
});
