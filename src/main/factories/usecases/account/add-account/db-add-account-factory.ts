import { DbAddAccount } from '@/data/usecases/account/add-account/db-add-account';
import { AddAccount } from '@/domain/usecases/account/add-account';
import { BcrypAdapter } from '@/infra/criptography';
import { AccountMongoRepository } from '@/infra/db';

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12;
  const hasher = new BcrypAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();

  return new DbAddAccount(hasher, accountMongoRepository, accountMongoRepository);
};
