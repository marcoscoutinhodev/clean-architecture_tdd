import { DbAddAccount } from '../../data/usecases/add-account/db-add-account';
import { BcrypAdapter } from '../../infra/criptography/bcrypt-adapter';
import { LogControllerDecorator } from '../decorator/log';
import { SignUpController } from '../../presentation/controllers/signup/signup';
import { Controller } from '../../presentation/protocols';
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account';
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log';
import {
  EmailValidatorAdapter, CpfValidatorAdapter, DateValidatorAdapter, PhoneNumberValidatorAdapter,
} from '../../utils';

export const makeSignUpController = (): Controller => {
  const salt = 12;
  const emailValidator = new EmailValidatorAdapter();
  const cpfValidator = new CpfValidatorAdapter();
  const dateValidator = new DateValidatorAdapter();
  const phoneNumberValidator = new PhoneNumberValidatorAdapter();
  const encrypter = new BcrypAdapter(salt);
  const addAccountRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(encrypter, addAccountRepository);

  const signUpController = new SignUpController({
    emailValidator,
    cpfValidator,
    dateValidator,
    phoneNumberValidator,
    addAccount: dbAddAccount,
  });

  const logMongoRepository = new LogMongoRepository();

  return new LogControllerDecorator(signUpController, logMongoRepository);
};
