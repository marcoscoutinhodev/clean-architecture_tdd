import { DbAddAccount } from './db-add-account';
import {
  AccountModel, AddAccountModel, AddAccountRepository, Encrypter,
} from './db-add-account-protocols';

const makeEncrypter = () => {
  class EncrypterStub implements Encrypter {
    async encrypt(password: string): Promise<string> {
      return new Promise((resolve) => { resolve('hashed_password'); });
    }
  }

  return new EncrypterStub();
};

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'hashed_password',
        cpf: 'valid_cpf',
        rg: 'valid_rg',
        birthdate: 'valid_birthdate',
        phoneNumber: 'valid_phone_number',
      };

      return new Promise((resolve) => { resolve(fakeAccount); });
    }
  }

  return new AddAccountRepositoryStub();
};

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const addAccountRepositoryStub = makeAddAccountRepository();
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);

  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub,
  };
};

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut();

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
      cpf: 'valid_cpf',
      rg: 'valid_rg',
      birthdate: 'valid_birthdate',
      phoneNumber: 'valid_phone_number',
    };

    await sut.add(accountData);

    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });

  test('Should throw if Encrypter throws', () => {
    const { sut, encrypterStub } = makeSut();

    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(() => { throw new Error(); });

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
      cpf: 'valid_cpf',
      rg: 'valid_rg',
      birthdate: 'valid_birthdate',
      phoneNumber: 'valid_phone_number',
    };

    const account = sut.add(accountData);

    expect(account).rejects.toThrow();
  });

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();

    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
      cpf: 'valid_cpf',
      rg: 'valid_rg',
      birthdate: 'valid_birthdate',
      phoneNumber: 'valid_phone_number',
    };

    await sut.add(accountData);

    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
      cpf: 'valid_cpf',
      rg: 'valid_rg',
      birthdate: 'valid_birthdate',
      phoneNumber: 'valid_phone_number',
    });
  });

  test('Should throw if AddAccountRepository throws', () => {
    const { sut, addAccountRepositoryStub } = makeSut();

    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(() => { throw new Error(); });

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
      cpf: 'valid_cpf',
      rg: 'valid_rg',
      birthdate: 'valid_birthdate',
      phoneNumber: 'valid_phone_number',
    };

    const response = sut.add(accountData);

    expect(response).rejects.toThrow();
  });

  test('Should return an account on success', async () => {
    const { sut } = makeSut();
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
      cpf: 'valid_cpf',
      rg: 'valid_rg',
      birthdate: 'valid_birthdate',
      phoneNumber: 'valid_phone_number',
    };

    const account = await sut.add(accountData);

    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
      cpf: 'valid_cpf',
      rg: 'valid_rg',
      birthdate: 'valid_birthdate',
      phoneNumber: 'valid_phone_number',
    });
  });
});