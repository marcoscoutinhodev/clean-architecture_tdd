import { SurveyModel } from '@/domain/models/survey';
import { AddSurvey, AddSurveyParams } from '@/domain/usecases/survey/add-survey';
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys';
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id';
import { mockSurveyModel, mockSurveyModels } from '@/domain/test';

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add(data: AddSurveyParams): Promise<void> {
      return new Promise((resolve) => { resolve(); });
    }
  }

  return new AddSurveyStub();
};

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return mockSurveyModels();
    }
  }

  return new LoadSurveysStub();
};

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async load(id: string): Promise<SurveyModel | null> {
      return mockSurveyModel();
    }
  }

  return new LoadSurveyByIdStub();
};
