import { Collection } from 'mongodb';
import { MongoHelper } from '../helpers/mongo-helper';
import { SurveyResultMongoRepository } from './survey-result-mongo-repository';
import { mongoUri } from '../../../../../globalConfig.json';
import { SurveyModel } from '@/domain/models/survey';
import { AccountModel } from '@/domain/models/account';

let surveyCollection: Collection;
let surveyResultCollection: Collection;
let accountCollection: Collection;

const makeSurvey = async (): Promise<SurveyModel> => {
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

const makeAccount = async (): Promise<AccountModel> => {
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
    surveyResultCollection = await MongoHelper.getCollection('surveys');
    await surveyResultCollection.deleteMany({});
    accountCollection = await MongoHelper.getCollection('surveys');
    await accountCollection.deleteMany({});
  });

  describe('save()', () => {
    test('Should add a survey result if doesnt exist', async () => {
      const survey = await makeSurvey();
      const account = await makeAccount();
      const sut = makeSut();

      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date(),
      });

      expect(surveyResult).toBeTruthy();
      expect(surveyResult?.id).toBeTruthy();
      expect(surveyResult?.answer).toBe(survey.answers[0].answer);
    });
  });
});
