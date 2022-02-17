import {
  SaveSurveyResult,
  SaveSurveyResultParams,
  SaveSurveyResultRepository,
  SurveyResultModel,
  LoadSurveyResultRepository,
} from './db-save-survey-protocols';

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadsurveyResultRepository: LoadSurveyResultRepository,
  ) {}

  async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data);
    const surveyResult = await this.loadsurveyResultRepository.loadBySurveyId(data.surveyId);

    return surveyResult!;
  }
}
