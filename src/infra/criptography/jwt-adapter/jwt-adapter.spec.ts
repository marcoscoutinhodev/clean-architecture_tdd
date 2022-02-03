import jwt from 'jsonwebtoken';
import { JwtAdapter } from './jwt-adapter';

jest.mock('jsonwebtoken', () => ({
  sign(): string {
    return 'any_token';
  },
}));

const makeSut = (): JwtAdapter => new JwtAdapter('secret');

describe('Jwt Adapter', () => {
  describe('sign()', () => {
    test('Should call sign with correct values', async () => {
      const sut = makeSut();
      const signSpy = jest.spyOn(jwt, 'sign');

      await sut.encrypt('any_id');

      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
    });

    test('Should return a token on sign success', async () => {
      const sut = makeSut();

      const accessToken = await sut.encrypt('any_value');

      expect(accessToken).toBe('any_token');
    });

    test('Should throw if sign throws', () => {
      const sut = makeSut();
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error(); });

      const promise = sut.encrypt('any_value');

      expect(promise).rejects.toThrow();
    });
  });
});
