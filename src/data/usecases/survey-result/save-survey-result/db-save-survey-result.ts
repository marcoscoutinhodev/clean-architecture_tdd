import {
  SaveSurveyResult, SaveSurveyResultParams, SaveSurveyResultRepository, SurveyResultModel,
} from './db-save-survey-protocols';

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
  ) {}

  async save(data: SaveSurveyResultParams): Promise<SurveyResultModel | null> {
    const survey = await this.saveSurveyResultRepository.save(data);
    return survey;
  }
}
