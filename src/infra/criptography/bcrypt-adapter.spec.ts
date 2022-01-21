import bcrypt from 'bcrypt';
import { BcrypAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  hash(): string {
    return 'any_value';
  },
}));

const salt = 12;

const makeSut = (): BcrypAdapter => {
  const sut = new BcrypAdapter(salt);

  return sut;
};

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.hash('any_value');

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });

  test('Should return a hash on success', async () => {
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
});
