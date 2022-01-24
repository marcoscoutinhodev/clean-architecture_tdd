import { LoginController } from '../../../presentation/controllers/login/login-controller';
import { Controller } from '../../../presentation/protocols';
import { LogControllerDecorator } from '../../decorator/log-controller-decorator';
import { makeLoginValidation } from './login-validation-factory';
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication';
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository';
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository';
import { BcrypAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter';
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter';
import env from '../../config/env';

export const makeLoginController = (): Controller => {
  const salt = 12;
  const bcryptAdapter = new BcrypAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository,
  );

  const loginController = new LoginController(
    dbAuthentication,
    makeLoginValidation(),
  );

  const logMongoRepository = new LogMongoRepository();

  return new LogControllerDecorator(loginController, logMongoRepository);
};
