import { Encrypter } from '../../protocols/encrypter';
import { DbAddAccount } from './db-add-account';

class EncrypterStub implements Encrypter {
  async encrypt(password: string): Promise<string> {
    return new Promise((resolve) => { resolve('hashed_password'); });
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const encrypterStub = new EncrypterStub();
    const sut = new DbAddAccount(encrypterStub);
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
      cpf: 'valid_cpf',
      rg: 'valid_rg',
      birthdate: 'valid_birthdate',
      phoneNumber: 'valid_phone_number',
    };

    await sut.add(accountData);

    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });
});
