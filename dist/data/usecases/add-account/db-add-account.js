"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbAddAccount = void 0;
class DbAddAccount {
    constructor(hasher, addAccountRepository) {
        this.hasher = hasher;
        this.addAccountRepository = addAccountRepository;
    }
    async add(accountData) {
        const hashedPassword = await this.hasher.hash(accountData.password);
        const accountDataWithPasswordHashed = {
            ...accountData,
            password: hashedPassword,
        };
        const account = await this.addAccountRepository.add(accountDataWithPasswordHashed);
        return account;
    }
}
exports.DbAddAccount = DbAddAccount;
