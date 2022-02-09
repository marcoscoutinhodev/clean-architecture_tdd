import { Collection } from 'mongodb';
import { AccountMongoRepository } from './account-mongo-repository';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { mongoUri } from '../../../../../globalConfig.json';
import { mockAddAccountParams } from '@/domain/test';

describe('Account MongoDB Repository', () => {
  let accountCollection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(mongoUri);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  const makeSut = (): AccountMongoRepository => new AccountMongoRepository();

  describe('add()', () => {
    test('Should return an account on add success', async () => {
      const sut = makeSut();
      const account = await sut.add(mockAddAccountParams());

      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe('any_name');
      expect(account.email).toBe('any_email@email.com');
      expect(account.password).toBe('any_password');
      expect(account.cpf).toBe('any_cpf');
      expect(account.birthdate).toBe('any_birthdate');
      expect(account.phoneNumber).toBe('any_phone_number');
    });
  });

  describe('loadByEmail()', () => {
    test('Should return an account on loadByEmail success', async () => {
      const sut = makeSut();
      await accountCollection.insertOne(mockAddAccountParams());
      const account = await sut.loadByEmail('any_email@email.com');

      expect(account).toBeTruthy();
      expect(account!.id).toBeTruthy();
      expect(account!.name).toBe('any_name');
      expect(account!.email).toBe('any_email@email.com');
      expect(account!.password).toBe('any_password');
      expect(account!.cpf).toBe('any_cpf');
      expect(account!.birthdate).toBe('any_birthdate');
      expect(account!.phoneNumber).toBe('any_phone_number');
    });

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut();
      const account = await sut.loadByEmail('any_email@email.com');

      expect(account).toBeNull();
    });
  });

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on updateAccessToken success', async () => {
      const sut = makeSut();
      const fakeId = await (
        await accountCollection.insertOne(mockAddAccountParams())
      ).insertedId;

      let account = await accountCollection.findOne({ _id: fakeId });

      expect(account?.accessToken).toBeFalsy();

      await sut.updateAccessToken(fakeId.toString(), 'any_token');

      account = await accountCollection.findOne({ _id: fakeId });

      expect(account).toBeTruthy();
      expect(account!.accessToken).toBe('any_token');
    });
  });

  describe('loadByToken()', () => {
    test('Should return an account on loadByToken without role', async () => {
      const sut = makeSut();
      await accountCollection.insertOne({
        ...mockAddAccountParams(),
        accessToken: 'any_token',
      });

      const account = await sut.loadByToken('any_token');

      expect(account).toBeTruthy();
      expect(account!.id).toBeTruthy();
      expect(account!.name).toBe('any_name');
      expect(account!.email).toBe('any_email@email.com');
      expect(account!.password).toBe('any_password');
      expect(account!.cpf).toBe('any_cpf');
      expect(account!.birthdate).toBe('any_birthdate');
      expect(account!.phoneNumber).toBe('any_phone_number');
    });

    test('Should return an account on loadByToken with admin role', async () => {
      const sut = makeSut();
      await accountCollection.insertOne({
        ...mockAddAccountParams(),
        accessToken: 'any_token',
        role: 'admin',
      });

      const account = await sut.loadByToken('any_token', 'admin');

      expect(account).toBeTruthy();
      expect(account!.id).toBeTruthy();
      expect(account!.name).toBe('any_name');
      expect(account!.email).toBe('any_email@email.com');
      expect(account!.password).toBe('any_password');
      expect(account!.cpf).toBe('any_cpf');
      expect(account!.birthdate).toBe('any_birthdate');
      expect(account!.phoneNumber).toBe('any_phone_number');
    });

    test('Should return null on loadByToken with invalid role', async () => {
      const sut = makeSut();
      await accountCollection.insertOne({
        ...mockAddAccountParams(),
        accessToken: 'any_token',
      });

      const account = await sut.loadByToken('any_token', 'admin');

      expect(account).toBeFalsy();
    });

    test('Should return an account on loadByToken if user is an admin', async () => {
      const sut = makeSut();
      await accountCollection.insertOne({
        ...mockAddAccountParams(),
        accessToken: 'any_token',
        role: 'admin',
      });

      const account = await sut.loadByToken('any_token');

      expect(account).toBeTruthy();
      expect(account!.id).toBeTruthy();
      expect(account!.name).toBe('any_name');
      expect(account!.email).toBe('any_email@email.com');
      expect(account!.password).toBe('any_password');
      expect(account!.cpf).toBe('any_cpf');
      expect(account!.birthdate).toBe('any_birthdate');
      expect(account!.phoneNumber).toBe('any_phone_number');
    });

    test('Should return null if loadByToken fails', async () => {
      const sut = makeSut();
      const account = await sut.loadByToken('any_token');

      expect(account).toBeNull();
    });
  });
});
