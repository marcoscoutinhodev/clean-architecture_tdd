import request from 'supertest';
import { hash } from 'bcrypt';
import app from '../config/app';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { mongoUri } from '../../../globalConfig.json';

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(mongoUri);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await (await MongoHelper.getCollection('accounts')).deleteMany({});
  });

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Test',
          email: 'test@email.com',
          password: 'test123',
          passwordConfirmation: 'test123',
          cpf: '868.296.428-76',
          birthdate: '1995-11-27',
          phoneNumber: '11-99999-9999',
        })
        .expect(200);
    });
  });

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('test123', 12);

      await (await MongoHelper.getCollection('accounts')).insertOne({
        name: 'Test',
        email: 'test@email.com',
        password,
        cpf: '868.296.428-76',
        birthdate: '1995-11-27',
        phoneNumber: '11-99999-9999',
      });

      await request(app)
        .post('/api/login')
        .send({
          email: 'test@email.com',
          password: 'test123',
        })
        .expect(200);
    });

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'test@email.com',
          password: 'test123',
        })
        .expect(401);
    });
  });
});
