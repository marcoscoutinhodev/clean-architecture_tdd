"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountMongoRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_helper_1 = require("../helpers/mongo-helper");
class AccountMongoRepository {
    async add(accountData) {
        const accountCollection = await mongo_helper_1.MongoHelper.getCollection('accounts');
        const accountId = await (await accountCollection.insertOne(accountData)).insertedId;
        const account = await accountCollection.findOne({ _id: accountId });
        return mongo_helper_1.MongoHelper.map(account);
    }
    async loadByEmail(email) {
        const accountCollection = await mongo_helper_1.MongoHelper.getCollection('accounts');
        const account = await accountCollection.findOne({ email });
        return account ? mongo_helper_1.MongoHelper.map(account) : null;
    }
    async updateAccessToken(id, token) {
        const accountCollection = await mongo_helper_1.MongoHelper.getCollection('accounts');
        const _id = new mongodb_1.ObjectId(id);
        await accountCollection.updateOne({
            _id,
        }, {
            $set: {
                accessToken: token,
            },
        });
    }
}
exports.AccountMongoRepository = AccountMongoRepository;
