import env from '@/main/config/env';
import { DbAuthentication } from '@/data/usecases/account/authentication/db-authentication';
import { Authentication } from '@/domain/usecases/account/authentication';
import { BcrypAdapter, JwtAdapter } from '@/infra/criptography';
import { AccountMongoRepository } from '@/infra/db';

export const makeDbAuthentication = (): Authentication => {
  const salt = 12;
  const bcryptAdapter = new BcrypAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();

  return new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository,
  );
};
