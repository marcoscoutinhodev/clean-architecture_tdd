import request from 'supertest';
import { Collection } from 'mongodb';
import { sign } from 'jsonwebtoken';
import app from '@/main/config/app';
import env from '@/main/config/env';
import { MongoHelper } from '@/infra/db';
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

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer',
        })
        .expect(403);
    });

    test('Should return 200 on success', async () => {
      const surveyId = (await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          image: 'link_image.com',
          answer: 'Answer 1',
        }, {
          image: 'link_image.com',
          answer: 'Answer 2',
        }],
        date: new Date(),
      })).insertedId;

      await request(app)
        .put(`/api/surveys/${surveyId}/results`)
        .set('x-access-token', await mockAccessToken())
        .send({
          answer: 'Answer 1',
        })
        .expect(200);
    });
  });

  describe('GET /surveys/:surveyId/results', () => {
    test('Should return 403 on load survey result without accessToken', async () => {
      await request(app)
        .get('/api/surveys/any_id/results')
        .expect(403);
    });

    test('Should return 200 on load survey result success ', async () => {
      const surveyId = (await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          image: 'link_image.com',
          answer: 'Answer 1',
        }, {
          image: 'link_image.com',
          answer: 'Answer 2',
        }],
        date: new Date(),
      })).insertedId;

      await request(app)
        .get(`/api/surveys/${surveyId}/results`)
        .set('x-access-token', await mockAccessToken())
        .expect(200);
    });
  });
});
