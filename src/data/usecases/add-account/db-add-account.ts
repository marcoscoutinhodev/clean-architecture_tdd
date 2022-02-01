import {
  AddAccount,
  AddAccountModel,
  AccountModel,
  Hasher,
  AddAccountRepository,
  LoadAccountByEmailRepository,
} from './db-add-account-protocols';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel | null> {
    if (await this.loadAccountByEmailRepository.loadByEmail(accountData.email)) {
      return null;
    }

    const hashedPassword = await this.hasher.hash(accountData.password);
    const accountDataWithPasswordHashed = {
      ...accountData,
      password: hashedPassword,
    };

    const newAccount = await this.addAccountRepository.add(accountDataWithPasswordHashed);

    return newAccount;
  }
}
