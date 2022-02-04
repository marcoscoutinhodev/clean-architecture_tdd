import { Collection } from 'mongodb';
import { AddAccountModel } from '../../../../domain/usecases/add-account';
import { MongoHelper } from '../helpers/mongo-helper';
import { AccountMongoRepository } from './account-mongo-repository';
import { mongoUri } from '../../../../../globalConfig.json';

const makeFakeAddAccountModel = (): AddAccountModel => ({
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password',
  cpf: 'any_cpf',
  rg: 'any_rg',
  birthdate: 'any_birthdate',
  phoneNumber: 'any_phone_number',
});

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
      const account = await sut.add(makeFakeAddAccountModel());

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

  describe('loadByEmail()', () => {
    test('Should return an account on loadByEmail success', async () => {
      const sut = makeSut();
      await accountCollection.insertOne(makeFakeAddAccountModel());
      const account = await sut.loadByEmail('any_email@email.com');

      expect(account).toBeTruthy();
      expect(account!.id).toBeTruthy();
      expect(account!.name).toBe('any_name');
      expect(account!.email).toBe('any_email@email.com');
      expect(account!.password).toBe('any_password');
      expect(account!.cpf).toBe('any_cpf');
      expect(account!.rg).toBe('any_rg');
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
        await accountCollection.insertOne(makeFakeAddAccountModel())
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
        ...makeFakeAddAccountModel(),
        accessToken: 'any_token',
      });

      const account = await sut.loadByToken('any_token');

      expect(account).toBeTruthy();
      expect(account!.id).toBeTruthy();
      expect(account!.name).toBe('any_name');
      expect(account!.email).toBe('any_email@email.com');
      expect(account!.password).toBe('any_password');
      expect(account!.cpf).toBe('any_cpf');
      expect(account!.rg).toBe('any_rg');
      expect(account!.birthdate).toBe('any_birthdate');
      expect(account!.phoneNumber).toBe('any_phone_number');
    });
  });
});
