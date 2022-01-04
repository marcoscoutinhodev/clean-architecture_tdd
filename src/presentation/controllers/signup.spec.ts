import { SignUpController } from './signup';
import { MissingParamError } from '../errors/missing-param-error';

describe('SignUp Controller', () => {
  test('Should return 400 if name is not provided', () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        cpf: 'any_cpf',
        rg: 'any_rg',
        birthdate: 'any_brithdate',
        cellphone: 'any_cellphone',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  test('Should return 400 if email is not provided', () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        cpf: 'any_cpf',
        rg: 'any_rg',
        birthdate: 'any_brithdate',
        cellphone: 'any_cellphone',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  test('Should return 400 if password is not provided', () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        name: 'any_name',
        passwordConfirmation: 'any_password',
        cpf: 'any_cpf',
        rg: 'any_rg',
        birthdate: 'any_brithdate',
        cellphone: 'any_cellphone',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  test('Should return 400 if passwordConfirmation is not provided', () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        name: 'any_name',
        password: 'any_password',
        cpf: 'any_cpf',
        rg: 'any_rg',
        birthdate: 'any_brithdate',
        cellphone: 'any_cellphone',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'));
  });
});
