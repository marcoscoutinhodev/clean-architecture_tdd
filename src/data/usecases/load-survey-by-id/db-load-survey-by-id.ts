import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository';
import { LoadSurveyById } from '@/domain/usecases/load-survey-by-id';
import { SurveyModel } from '../load-surveys/db-load-surveys-protocols';

export class DbLoadSurveyById implements LoadSurveyById {
  constructor(
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository,
  ) {}

  async load(id: string): Promise<SurveyModel | null> {
    const survey = await this.loadSurveyByIdRepository.loadById(id);
    return survey;
  }
}
