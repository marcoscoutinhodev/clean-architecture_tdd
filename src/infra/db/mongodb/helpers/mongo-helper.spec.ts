import { MongoHelper as sut } from './mongo-helper';
import { mongoUri } from '../../../../../globalConfig.json';

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(mongoUri);
  });

  afterAll(async () => {
    await sut.disconnect();
  });

  test('Should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('accounts');

    expect(accountCollection).toBeTruthy();
    await sut.disconnect();

    accountCollection = await sut.getCollection('accounts');
    expect(accountCollection).toBeTruthy();
  });
});
