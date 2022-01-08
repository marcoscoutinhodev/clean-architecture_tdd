import { MongoHelper } from '../helpers/mongo-helper';
import { AccountMongoRepository } from './account';

describe('Account MongoDB Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect();
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test('Should return an account on success', async () => {
    const sut = new AccountMongoRepository();
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
      cpf: 'any_cpf',
      rg: 'any_rg',
      birthdate: 'any_birthdate',
      phoneNumber: 'any_phone_number',
    });

    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('any_name');
    expect(account.email).toBe('any_email@email.com');
    expect(account.password).toBe('any_password');
    expect(account.cpf).toBe('any_cpf');
    expect(account.rg).toBe('any_rg');
    expect(account.birthdate).toBe('any_birthdate');
    expect(account.phoneNumber).toBe('any_phone_number');
  });
});
