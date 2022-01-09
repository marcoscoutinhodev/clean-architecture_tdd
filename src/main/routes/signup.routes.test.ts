import request from 'supertest';
import app from '../config/app';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect();
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await MongoHelper.getCollection('accounts').deleteMany({});
  });

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Test',
        email: 'test@email.com',
        password: 'test123',
        passwordConfirmation: 'test123',
        cpf: '868.296.428-76',
        rg: '25.323.607-1',
        birthdate: '1995-11-27',
        phoneNumber: '11-99999-9999',
      })
      .expect(200);
  });
});
