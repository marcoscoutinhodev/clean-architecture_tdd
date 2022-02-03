import { DbLoadAccountByToken } from './db-load-account-by-token';
import { Decrypter } from '../../protocols/criptography/decrypter';
import { AccountModel } from '../add-account/db-add-account-protocols';
import { LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository';

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(token: string): Promise<string> {
      return 'any_value';
    }
  }

  return new DecrypterStub();
};

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'valid_password',
  cpf: 'valid_cpf',
  rg: 'valid_rg',
  birthdate: 'valid_birthdate',
  phoneNumber: 'valid_phone_number',
});

const makeLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken(token: string, role?: string): Promise<AccountModel> {
      return makeFakeAccount();
    }
  }

  return new LoadAccountByTokenRepositoryStub();
};

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter();
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepository();
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub);

  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepositoryStub,
  };
};

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut();
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt');

    await sut.load('any_token', 'any_role');

    expect(decryptSpy).toHaveBeenCalledWith('any_token');
  });

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut();
    jest.spyOn(decrypterStub, 'decrypt').mockResolvedValueOnce(null);

    const account = await sut.load('any_token', 'any_role');

    expect(account).toBeNull();
  });

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken');

    await sut.load('any_token', 'any_role');

    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role');
  });

  test('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockResolvedValueOnce(null);

    const account = await sut.load('any_token', 'any_role');

    expect(account).toBeNull();
  });

  test('Should return an account on success', async () => {
    const { sut } = makeSut();

    const account = await sut.load('any_token', 'any_role');

    expect(account).toEqual(makeFakeAccount());
  });

  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut();
    jest.spyOn(decrypterStub, 'decrypt').mockRejectedValueOnce(new Error());

    const promise = sut.load('any_token', 'any_role');

    expect(promise).rejects.toThrow();
  });

  test('Should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockRejectedValueOnce(new Error());

    const promise = sut.load('any_token', 'any_role');

    expect(promise).rejects.toThrow();
  });
});
