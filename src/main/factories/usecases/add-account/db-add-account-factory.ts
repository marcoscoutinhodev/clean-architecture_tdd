import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account';
import { AddAccount } from '../../../../domain/usecases/add-account';
import { BcrypAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter';
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository';

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12;
  const hasher = new BcrypAdapter(salt);
  const addAccountRepository = new AccountMongoRepository();
  const loadAccountByEmailRepository = new AccountMongoRepository();

  return new DbAddAccount(hasher, addAccountRepository, loadAccountByEmailRepository);
};
