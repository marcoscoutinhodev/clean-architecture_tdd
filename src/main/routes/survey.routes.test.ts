import { sign } from 'jsonwebtoken';
import { Collection } from 'mongodb';
import request from 'supertest';
import app from '@/main/config/app';
import env from '@/main/config/env';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { mongoUri } from '../../../globalConfig.json';

let accountCollection: Collection;
let surveyCollection: Collection;

const mockAccessToken = async (): Promise<string> => {
  const accountId = (await accountCollection.insertOne({
    name: 'Test',
    email: 'test@email.com',
    password: 'any_password',
    cpf: '868.296.428-76',
    birthdate: '1995-11-27',
    phoneNumber: '11-99999-9999',
    role: 'admin',
  })).insertedId;

  const accessToken = sign({ accountId }, env.jwtSecret);

  await accountCollection.updateOne({
    _id: accountId,
  }, {
    $set: {
      accessToken,
    },
  });

  return accessToken;
};

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(mongoUri);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [{
            image: 'http://image-name.com',
            answer: 'Answer 1',
          }, {
            answer: 'Answer 2',
          }],
        })
        .expect(403);
    });

    test('Should return 204 on add survey with valid accessToken', async () => {
      const accessToken = await mockAccessToken();

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [{
            image: 'http://image-name.com',
            answer: 'Answer 1',
          }, {
            answer: 'Answer 2',
          }],
        })
        .expect(204);
    });
  });

  describe('GET /surveys', () => {
    test('Should return 403 on load surveys without accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .send()
        .expect(403);
    });

    test('Should return 204 on load surveys with valid accessToken', async () => {
      const accessToken = await mockAccessToken();

      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .send()
        .expect(204);
    });
  });
});
