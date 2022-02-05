import { Collection } from 'mongodb';
import { SurveyMongoRepository } from './survey-mongo-repository';
import { AddSurveyModel } from '../../../../domain/usecases/add-survey';
import { MongoHelper } from '../helpers/mongo-helper';
import { mongoUri } from '../../../../../globalConfig.json';

const makeFakeAddSurveyModel = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer',
  }, {
    answer: 'other_answer',
  }],
  date: new Date(),
});

describe('Survey MongoDB Repository', () => {
  let surveyCollection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(mongoUri);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});
  });

  const makeSut = (): SurveyMongoRepository => new SurveyMongoRepository();

  test('Should add a survey success', async () => {
    const sut = makeSut();
    await sut.add(makeFakeAddSurveyModel());

    const survey = await surveyCollection.findOne({ question: 'any_question' });

    expect(survey).toBeTruthy();
  });
});
