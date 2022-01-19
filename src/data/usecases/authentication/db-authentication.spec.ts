import { DbAuthentication } from './db-authentication';
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository';
import { AccountModel } from '../add-account/db-add-account-protocols';

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
      async load(email: string): Promise<AccountModel | null> {
        const account: AccountModel = {
          id: 'any_id',
          name: 'any_name',
          email: 'any_email',
          password: 'any_password',
          cpf: 'any_cpf',
          rg: 'any_rg',
          birthdate: 'any_birthdate',
          phoneNumber: 'any_phoneNumber',
        };

        return new Promise((resolve) => { resolve(account); });
      }
    }

    const loadAccountByEmailRepository = new LoadAccountByEmailRepositoryStub();
    const sut = new DbAuthentication(loadAccountByEmailRepository);
    const loadSpy = jest.spyOn(loadAccountByEmailRepository, 'load');

    await sut.auth({ email: 'any_email@email.com', password: 'any_password' });

    expect(loadSpy).toHaveBeenCalledWith('any_email@email.com');
  });
});
