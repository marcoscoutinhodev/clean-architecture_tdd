import bcrypt from 'bcrypt';
import { Hasher } from '../../data/protocols/criptography/hasher';

export class BcrypAdapter implements Hasher {
  private readonly salt: number;

  constructor(salt: number) {
    this.salt = salt;
  }
  async hash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash;
  }
}
