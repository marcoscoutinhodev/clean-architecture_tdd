import { SignUpController } from '../../../presentation/controllers/signup/signup-controller';
import { Controller } from '../../../presentation/protocols';
import { BcrypAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter';
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository';
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account';
import { makeSignUpValidation } from './signup-validation-factory';
import { LogControllerDecorator } from '../../decorator/log-controller-decorator';
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository';
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter';
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication';
import env from '../../config/env';

export const makeSignUpController = (): Controller => {
  const salt = 12;
  const hasher = new BcrypAdapter(salt);
  const addAccountRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(hasher, addAccountRepository);

  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    hasher,
    jwtAdapter,
    accountMongoRepository,
  );

  const signUpController = new SignUpController(
    dbAddAccount,
    makeSignUpValidation(),
    dbAuthentication,
  );

  const logMongoRepository = new LogMongoRepository();

  return new LogControllerDecorator(signUpController, logMongoRepository);
};
