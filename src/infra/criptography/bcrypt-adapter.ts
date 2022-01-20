import bcrypt from 'bcrypt';
import { Encrypter } from '../../data/protocols/criptography/encrypter';

export class BcrypAdapter implements Encrypter {
  private readonly salt: number;

  constructor(salt: number) {
    this.salt = salt;
  }
  async encrypt(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash;
  }
}
