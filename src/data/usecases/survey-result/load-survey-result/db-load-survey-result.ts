import { LoadSurveyResult, LoadSurveyResultRepository, SurveyResultModel } from './db-load-survey-protocols';

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
  ) {}

  async load(surveyId: string): Promise<SurveyResultModel> {
    const survey = await this.loadSurveyResultRepository.loadBySurveyId(surveyId);
    return survey;
  }
}
