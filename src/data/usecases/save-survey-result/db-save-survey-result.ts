import {
  SaveSurveyResult, SaveSurveyResultModel, SaveSurveyResultRepository, SurveyResultModel,
} from './db-save-survey-protocols';

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
  ) {}

  async save(data: SaveSurveyResultModel): Promise<SurveyResultModel | null> {
    const survey = await this.saveSurveyResultRepository.save(data);
    return survey;
  }
}
