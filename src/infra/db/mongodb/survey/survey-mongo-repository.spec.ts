import { Collection } from 'mongodb';
import { MongoHelper } from '../helpers/mongo-helper';
import { SurveyMongoRepository } from './survey-mongo-repository';
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey';
import { mongoUri } from '../../../../../globalConfig.json';

const makeFakeAddSurveyParams = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer',
  }, {
    answer: 'other_answer',
  }],
  date: new Date(),
});

const makeSut = (): SurveyMongoRepository => new SurveyMongoRepository();

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

  describe('add()', () => {
    test('Should add a survey success', async () => {
      const sut = makeSut();
      await sut.add(makeFakeAddSurveyParams());

      const survey = await surveyCollection.findOne({ question: 'any_question' });

      expect(survey).toBeTruthy();
    });
  });

  describe('loadAll()', () => {
    test('Should loadAll surveys on success', async () => {
      await surveyCollection.insertOne(makeFakeAddSurveyParams());
      await surveyCollection.insertOne({
        question: 'other_question',
        answers: [{
          image: 'other_image.com',
          answer: 'other_answer',
        }],
      });
      const sut = makeSut();

      const surveys = await sut.loadAll();

      expect(surveys.length).toBe(2);
      expect(surveys[0].id).toBeTruthy();
      expect(surveys[0].question).toBe('any_question');
      expect(surveys[1].question).toBe('other_question');
    });

    test('Should return an empty list', async () => {
      const sut = makeSut();

      const surveys = await sut.loadAll();

      expect(surveys.length).toBe(0);
    });
  });

  describe('loadById()', () => {
    test('Should load survey by id on success', async () => {
      const surveyId = (await surveyCollection.insertOne(makeFakeAddSurveyParams())).insertedId;
      const sut = makeSut();

      const surveys = await sut.loadById(surveyId.toString());

      expect(surveys).toBeTruthy();
      expect(surveys!.id).toBeTruthy();
    });
  });
});
