import { Collection, ObjectId } from 'mongodb';
import { MongoHelper, SurveyResultMongoRepository } from '@/infra/db';
import { SurveyModel } from '@/domain/models/survey';
import { AccountModel } from '@/domain/models/account';
import { mongoUri } from '../../../../../globalConfig.json';

let surveyCollection: Collection;
let surveyResultsCollection: Collection;
let accountCollection: Collection;

const mockSurvey = async (): Promise<SurveyModel> => {
  const surveyId = (await surveyCollection.insertOne({
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer',
    }, {
      answer: 'other_answer',
    }],
    date: new Date(),
  })).insertedId;

  const survey = await surveyCollection.findOne({ _id: surveyId });

  return MongoHelper.map(survey);
};

const mockAccount = async (): Promise<AccountModel> => {
  const accountId = (await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password',
    cpf: 'any_cpf',
    birthdate: 'any_birthdate',
    phoneNumber: 'any_phone_number',
  })).insertedId;

  const account = await accountCollection.findOne({ _id: accountId });

  return MongoHelper.map(account);
};

const makeSut = (): SurveyResultMongoRepository => new SurveyResultMongoRepository();

describe('Survey Result MongoDB Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(mongoUri);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});
    surveyResultsCollection = await MongoHelper.getCollection('surveyResults');
    await surveyResultsCollection.deleteMany({});
    accountCollection = await MongoHelper.getCollection('surveys');
    await accountCollection.deleteMany({});
  });

  describe('save()', () => {
    test('Should add a survey result if doesnt exist', async () => {
      const survey = await mockSurvey();
      const account = await mockAccount();
      const sut = makeSut();

      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date(),
      });

      expect(surveyResult).toBeTruthy();
      expect(surveyResult.surveyId).toEqual(survey.id);
      expect(surveyResult.answers[0].count).toBe(1);
      expect(surveyResult.answers[0].percent).toBe(100);
      expect(surveyResult.answers[1].count).toBe(0);
      expect(surveyResult.answers[1].percent).toBe(0);
    });

    test('Should update the survey result if already registered', async () => {
      const survey = await mockSurvey();
      const account = await mockAccount();
      await surveyResultsCollection.insertOne({
        surveyId: new ObjectId(survey.id),
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date(),
      });

      const sut = makeSut();

      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[1].answer,
        date: new Date(),
      });

      expect(surveyResult).toBeTruthy();
      expect(surveyResult.surveyId).toEqual(survey.id);
      expect(surveyResult.answers[0].answer).toBe(survey.answers[1].answer);
      expect(surveyResult.answers[0].count).toBe(1);
      expect(surveyResult.answers[0].percent).toBe(100);
      expect(surveyResult.answers[1].count).toBe(0);
      expect(surveyResult.answers[1].percent).toBe(0);
    });
  });
});
