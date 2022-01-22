import { ObjectId } from 'mongodb';
import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository';
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository';
import { UpdateAccessTokenRepository } from '../../../../data/protocols/db/update-access-token-repository';
import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/usecases/add-account';
import { MongoHelper } from '../helpers/mongo-helper';

export class AccountMongoRepository implements
  AddAccountRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');

    const accountId = await (await accountCollection.insertOne(accountData)).insertedId;
    const account = await accountCollection.findOne({ _id: accountId });

    return MongoHelper.map(account);
  }

  async loadByEmail(email: string): Promise<AccountModel | null> {
    const accountCollection = await MongoHelper.getCollection('accounts');

    const account = await accountCollection.findOne({ email });

    return account ? MongoHelper.map(account) : null;
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const _id = new ObjectId(id);

    await accountCollection.updateOne({
      _id,
    }, {
      $set: {
        accessToken: token,
      },
    });
  }
}
