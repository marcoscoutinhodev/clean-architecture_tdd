import bcrypt from 'bcrypt';
import { BcrypAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return 'any_value';
  },
  async compare(): Promise<boolean> {
    return true;
  },
}));

const salt = 12;

const makeSut = (): BcrypAdapter => {
  const sut = new BcrypAdapter(salt);

  return sut;
};

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct values', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.hash('any_value');

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });

  test('Should return a valid hash on hash success', async () => {
    const sut = makeSut();

    const hash = await sut.hash('any_value');

    expect(hash).toBe('any_value');
  });

  test('Should throw if bcrypt throws', () => {
    const sut = makeSut();

    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error(); });

    const response = sut.hash('any_value');

    expect(response).rejects.toThrow();
  });

  test('Should call compare with correct values', async () => {
    const sut = makeSut();
    const compareSpy = jest.spyOn(bcrypt, 'compare');

    await sut.compare('any_value', 'any_hash');

    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash');
  });

  test('Should return true when compare succeeds', async () => {
    const sut = makeSut();

    const isValid = await sut.compare('any_value', 'any_hash');

    expect(isValid).toBe(true);
  });

  test('Should return false when compare fails', async () => {
    const sut = makeSut();
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false);

    const isValid = await sut.compare('any_value', 'any_hash');

    expect(isValid).toBe(false);
  });
});
