import { sign } from 'jsonwebtoken';
import { Collection } from 'mongodb';
import request from 'supertest';
import app from '../config/app';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import { mongoUri } from '../../../globalConfig.json';
import env from '../config/env';

describe('Survey Routes', () => {
  let accountCollection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(mongoUri);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await (await MongoHelper.getCollection('surveys')).deleteMany({});
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
      const accountId = (await accountCollection.insertOne({
        name: 'Test',
        email: 'test@email.com',
        password: 'any_password',
        cpf: '868.296.428-76',
        rg: '25.323.607-1',
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
});
