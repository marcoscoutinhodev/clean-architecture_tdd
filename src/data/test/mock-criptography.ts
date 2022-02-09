import { Hasher } from '../protocols/criptography/hasher';
import { Encrypter } from '../protocols/criptography/encrypter';
import { Decrypter } from '../protocols/criptography/decrypter';
import { HashComparer } from '../protocols/criptography/hash-comparer';

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(password: string): Promise<string> {
      return new Promise((resolve) => { resolve('hashed_password'); });
    }
  }

  return new HasherStub();
};

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(id: string): Promise<string> {
      return 'any_token';
    }
  }

  return new EncrypterStub();
};

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(token: string): Promise<string> {
      return 'any_value';
    }
  }

  return new DecrypterStub();
};

export const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
      return true;
    }
  }

  return new HashComparerStub();
};
