import { DbAddAccount } from '@/data/usecases/account/add-account/db-add-account';
import {
  AddAccountRepository, Hasher, LoadAccountByEmailRepository,
} from '@/data/usecases/account/add-account/db-add-account-protocols';
import { mockAddAccountRepository, mockHasher, mockLoadAccountByEmailRepository } from '@/tests/data/mocks';
import { mockAccountModel, mockAddAccountParams } from '@/tests/domain/mocks';

type SutTypes = {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
};

const makeSut = (): SutTypes => {
  const hasherStub = mockHasher();
  const addAccountRepositoryStub = mockAddAccountRepository();
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository();
  jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockResolvedValue(null);
  const sut = new DbAddAccount(
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub,
  );

  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub,
  };
};

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut();

    const hashSpy = jest.spyOn(hasherStub, 'hash');

    const accountData = mockAddAccountParams();

    await sut.add(accountData);

    expect(hashSpy).toHaveBeenCalledWith('any_password');
  });

  test('Should throw if Hasher throws', () => {
    const { sut, hasherStub } = makeSut();

    jest.spyOn(hasherStub, 'hash').mockRejectedValueOnce(new Error());

    const accountData = mockAddAccountParams();

    const account = sut.add(accountData);

    expect(account).rejects.toThrow();
  });

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();

    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');

    const accountData = mockAddAccountParams();

    await sut.add(accountData);

    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'hashed_password',
      cpf: 'any_cpf',
      birthdate: 'any_birthdate',
      phoneNumber: 'any_phone_number',
    });
  });

  test('Should throw if AddAccountRepository throws', () => {
    const { sut, addAccountRepositoryStub } = makeSut();

    jest.spyOn(addAccountRepositoryStub, 'add').mockRejectedValueOnce(new Error());

    const accountData = mockAddAccountParams();

    const response = sut.add(accountData);

    expect(response).rejects.toThrow();
  });

  test('Should return an account on success', async () => {
    const { sut } = makeSut();
    const accountData = mockAddAccountParams();

    const account = await sut.add(accountData);

    expect(account).toEqual(mockAccountModel());
  });

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail');

    await sut.add(mockAddAccountParams());

    expect(loadSpy).toHaveBeenCalledWith('any_email@email.com');
  });

  test('Should return null if LoadAccountByEmailRepository returns an account', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(async () => mockAccountModel());

    const account = await sut.add(mockAddAccountParams());

    expect(account).toBeNull();
  });
});
