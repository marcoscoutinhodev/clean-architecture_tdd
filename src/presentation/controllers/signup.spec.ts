import { SignUpController } from './signup';
import { EmailValidator, CpfValidator } from '../protocols';
import { MissingParamError, InvalidParamError, ServerError } from '../errors';

interface SutTypes {
  sut: SignUpController,
  emailValidatorStub: EmailValidator,
  cpfValidatorStub: CpfValidator,
}

const makeCpfValidator = () => {
  class CpfValidatorStub implements CpfValidator {
    isValid(cpf: string) {
      return true;
    }
  }

  return new CpfValidatorStub();
};

const makeEmailValidator = () => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

const makeSut = (): SutTypes => {
  const cpfValidatorStub = makeCpfValidator();
  const emailValidatorStub = makeEmailValidator();
  const sut = new SignUpController(emailValidatorStub, cpfValidatorStub);

  return {
    sut,
    emailValidatorStub,
    cpfValidatorStub,
  };
};

describe('SignUp Controller', () => {
  test('Should return 400 if name is not provided', () => {
    const { sut } = makeSut();
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
    const { sut } = makeSut();
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
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
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
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
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

  test('Should return 400 if password confirmation fails', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'invalid_password',
        cpf: 'any_cpf',
        rg: 'any_rg',
        birthdate: 'any_brithdate',
        cellphone: 'any_cellphone',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('password confirmation'));
  });

  test('Should return 400 if cpf is not provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        rg: 'any_rg',
        birthdate: 'any_brithdate',
        cellphone: 'any_cellphone',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('cpf'));
  });

  test('Should return 400 if rg is not provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        cpf: 'any_cpf',
        birthdate: 'any_brithdate',
        cellphone: 'any_cellphone',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('rg'));
  });

  test('Should return 400 if birthdate is not provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        cpf: 'any_cpf',
        rg: 'any_rg',
        cellphone: 'any_cellphone',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('birthdate'));
  });

  test('Should return 400 if cellphone is not provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        cpf: 'any_cpf',
        rg: 'any_rg',
        birthdate: 'any_brithdate',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('cellphone'));
  });

  test('Should return 400 if email provided is invalid', () => {
    const { sut, emailValidatorStub } = makeSut();

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        cpf: 'any_cpf',
        birthdate: 'any_brithdate',
        rg: 'any_rg',
        cellphone: 'any_cellphone',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut();

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        cpf: 'any_cpf',
        birthdate: 'any_brithdate',
        rg: 'any_rg',
        cellphone: 'any_cellphone',
      },
    };

    sut.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com');
  });

  test('Should return 500 if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut();

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementation(() => {
      throw new Error();
    });

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        cpf: 'any_cpf',
        birthdate: 'any_brithdate',
        rg: 'any_rg',
        cellphone: 'any_cellphone',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should return 400 if cpf provided is invalid', () => {
    const { sut, cpfValidatorStub } = makeSut();

    jest.spyOn(cpfValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        cpf: 'invalid_cpf',
        birthdate: 'any_brithdate',
        rg: 'any_rg',
        cellphone: 'any_cellphone',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('cpf'));
  });
});
