import { AddSurveyRepository } from '../../../../data/protocols/db/survey/add-survey-repository';
import { LoadSurveysRepository, SurveyModel } from '../../../../data/usecases/load-surveys/db-load-surveys-protocols';
import { AddSurveyModel } from '../../../../domain/usecases/add-survey';
import { MongoHelper } from '../helpers/mongo-helper';

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add(surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.insertOne(surveyData);
  }

  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const surveys = await surveyCollection.find().toArray();
    const mappedSurveys: SurveyModel[] = [];

    surveys.forEach((survey) => {
      mappedSurveys.push(MongoHelper.map(survey));
    });

    return mappedSurveys;
  }
}
