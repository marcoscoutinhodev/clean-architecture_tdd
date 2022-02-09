import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository';
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository';
import { AddSurveyParams } from '@/data/usecases/survey/add-survey/db-add-survey-protocols';
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository';
import { SurveyModel } from '@/domain/models/survey';
import { mockSurveyModel, mockSurveyModels } from '@/domain/test';

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(surveyData: AddSurveyParams): Promise<void> {
      return new Promise((resolve) => { resolve(); });
    }
  }

  return new AddSurveyRepositoryStub();
};

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdStub implements LoadSurveyByIdRepository {
    async loadById(id: string): Promise<SurveyModel | null> {
      return mockSurveyModel();
    }
  }

  return new LoadSurveyByIdStub();
};

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll(): Promise<SurveyModel[]> {
      return mockSurveyModels();
    }
  }

  return new LoadSurveysRepositoryStub();
};
