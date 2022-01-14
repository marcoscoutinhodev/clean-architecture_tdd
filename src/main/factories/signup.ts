import { SignUpController } from '../../presentation/controllers/signup/signup';
import { Controller } from '../../presentation/protocols';
import { BcrypAdapter } from '../../infra/criptography/bcrypt-adapter';
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account';
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account';
import { makeSignUpValidation } from './signup-validation';
import { LogControllerDecorator } from '../decorator/log';
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log';

export const makeSignUpController = (): Controller => {
  const salt = 12;
  const encrypter = new BcrypAdapter(salt);
  const addAccountRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(encrypter, addAccountRepository);

  const signUpController = new SignUpController({
    addAccount: dbAddAccount,
    validation: makeSignUpValidation(),
  });

  const logMongoRepository = new LogMongoRepository();

  return new LogControllerDecorator(signUpController, logMongoRepository);
};
