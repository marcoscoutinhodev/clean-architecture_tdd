import { DbAuthentication } from './db-authentication';
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository';
import { AccountModel } from '../add-account/db-add-account-protocols';
import { AuthenticationModel } from '../../../domain/usecases/authentication';

const makeFakeAccount: AccountModel = {
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
  cpf: 'any_cpf',
  rg: 'any_rg',
  birthdate: 'any_birthdate',
  phoneNumber: 'any_phoneNumber',
};

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load(email: string): Promise<AccountModel | null> {
      return new Promise((resolve) => { resolve(makeFakeAccount); });
    }
  }

  return new LoadAccountByEmailRepositoryStub();
};

const makeAuthentication = (): AuthenticationModel => ({
  email: 'any_email@email.com',
  password: 'any_password',
});

interface SutTypes {
  sut: DbAuthentication,
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub);

  return {
    sut,
    loadAccountByEmailRepositoryStub,
  };
};

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load');

    await sut.auth(makeAuthentication());

    expect(loadSpy).toHaveBeenCalledWith('any_email@email.com');
  });
});
