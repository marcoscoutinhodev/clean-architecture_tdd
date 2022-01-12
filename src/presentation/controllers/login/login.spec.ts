import { LoginController } from './login';
import {
  ok, badRequest, serverError, unauthorized,
} from '../../helpers/http-helper';
import { InvalidParamError, MissingParamError } from '../../errors';
import { HttpRequest, EmailValidator, Authentication } from './login-protocols';

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@email.com',
    password: 'any_password',
  },
});

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(email: string, password: string): Promise<string> {
      return 'any_token';
    }
  }

  return new AuthenticationStub();
};

interface SutTypes {
  sut: LoginController
  emailValidatorStub: EmailValidator
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const authenticationStub = makeAuthentication();
  const sut = new LoginController(emailValidatorStub, authenticationStub);

  return {
    sut,
    emailValidatorStub,
    authenticationStub,
  };
};

describe('Login Controller', () => {
  test('Should return 400 if email is not provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        ...makeFakeRequest().body,
        email: undefined,
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')));
  });

  test('Should return 400 if password is not provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        ...makeFakeRequest().body,
        password: undefined,
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')));
  });

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const httpRequest = makeFakeRequest();

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');

    await sut.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com');
  });

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const httpRequest = makeFakeRequest();

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')));
  });

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const httpRequest = makeFakeRequest();

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const httpRequest = makeFakeRequest();

    const authSpy = jest.spyOn(authenticationStub, 'auth');

    await sut.handle(httpRequest);

    expect(authSpy).toHaveBeenCalledWith('any_email@email.com', 'any_password');
  });

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut();
    const httpRequest = makeFakeRequest();

    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(
      new Promise((resolve) => { resolve(undefined); }),
    );

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(unauthorized());
  });

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut();
    const httpRequest = makeFakeRequest();

    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(async () => (
      new Promise((resolve, reject) => { reject(new Error()); })
    ));

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeRequest();

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }));
  });
});
