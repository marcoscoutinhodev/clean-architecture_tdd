import { DbAddAccount } from './db-add-account';
import {
  AccountModel, AddAccountModel, AddAccountRepository, Hasher,
} from './db-add-account-protocols';

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(password: string): Promise<string> {
      return new Promise((resolve) => { resolve('hashed_password'); });
    }
  }

  return new HasherStub();
};

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password',
  cpf: 'valid_cpf',
  rg: 'valid_rg',
  birthdate: 'valid_birthdate',
  phoneNumber: 'valid_phone_number',
});

const makeFakeAccountData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password',
  cpf: 'valid_cpf',
  rg: 'valid_rg',
  birthdate: 'valid_birthdate',
  phoneNumber: 'valid_phone_number',
});

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = makeFakeAccount();

      return new Promise((resolve) => { resolve(fakeAccount); });
    }
  }

  return new AddAccountRepositoryStub();
};

interface SutTypes {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher();
  const addAccountRepositoryStub = makeAddAccountRepository();
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub);

  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
  };
};

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut();

    const hashSpy = jest.spyOn(hasherStub, 'hash');

    const accountData = makeFakeAccountData();

    await sut.add(accountData);

    expect(hashSpy).toHaveBeenCalledWith('valid_password');
  });

  test('Should throw if Hasher throws', () => {
    const { sut, hasherStub } = makeSut();

    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(() => { throw new Error(); });

    const accountData = makeFakeAccountData();

    const account = sut.add(accountData);

    expect(account).rejects.toThrow();
  });

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();

    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');

    const accountData = makeFakeAccountData();

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

    const accountData = makeFakeAccountData();

    const response = sut.add(accountData);

    expect(response).rejects.toThrow();
  });

  test('Should return an account on success', async () => {
    const { sut } = makeSut();
    const accountData = makeFakeAccountData();

    const account = await sut.add(accountData);

    expect(account).toEqual(makeFakeAccount());
  });
});
