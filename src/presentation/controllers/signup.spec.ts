import exp from 'constants';
import { SignUpController } from './signup';
import {
  EmailValidator, CpfValidator, DateValidator, CellphoneValidator,
} from '../protocols';
import { MissingParamError, InvalidParamError, ServerError } from '../errors';
import { AccountModel } from '../../domain/models/account';
import { AddAccount, AddAccountModel } from '../../domain/usecases/add-account';

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    add(account: AddAccountModel): AccountModel {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: 'valid_password',
        cpf: 'valid_cpf',
        rg: 'valid_rg',
        birthdate: 'valid_birthdate',
        cellphone: 'valid_cellphone',
      };

      return fakeAccount;
    }
  }

  return new AddAccountStub();
};

const makeCellphoneValidator = (): CellphoneValidator => {
  class CellphoneValidatorStub implements CellphoneValidator {
    isValid(cellphone: string): boolean {
      return true;
    }
  }

  return new CellphoneValidatorStub();
};

const makeDateValidator = (): DateValidator => {
  class DateValidatorStub implements DateValidator {
    isValid(date: string): boolean {
      return true;
    }
  }

  return new DateValidatorStub();
};

const makeCpfValidator = (): CpfValidator => {
  class CpfValidatorStub implements CpfValidator {
    isValid(cpf: string) {
      return true;
    }
  }

  return new CpfValidatorStub();
};

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

interface SutTypes {
  sut: SignUpController,
  emailValidatorStub: EmailValidator,
  cpfValidatorStub: CpfValidator,
  dateValidatorStub: DateValidator,
  cellphoneValidatorStub: CellphoneValidator,
  addAccountStub: AddAccount,
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const cpfValidatorStub = makeCpfValidator();
  const dateValidatorStub = makeDateValidator();
  const cellphoneValidatorStub = makeCellphoneValidator();
  const addAccountStub = makeAddAccount();

  const sut = new SignUpController(emailValidatorStub, cpfValidatorStub, dateValidatorStub, cellphoneValidatorStub, addAccountStub);

  return {
    sut,
    emailValidatorStub,
    cpfValidatorStub,
    dateValidatorStub,
    cellphoneValidatorStub,
    addAccountStub,
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
        birthdate: 'any_birthdate',
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
        birthdate: 'any_birthdate',
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
        birthdate: 'any_birthdate',
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
        birthdate: 'any_birthdate',
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
        birthdate: 'any_birthdate',
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
        birthdate: 'any_birthdate',
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
        birthdate: 'any_birthdate',
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
        birthdate: 'any_birthdate',
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
        rg: 'any_rg',
        birthdate: 'any_birthdate',
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
        rg: 'any_rg',
        birthdate: 'any_birthdate',
        cellphone: 'any_cellphone',
      },
    };

    sut.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com');
  });

  test('Should return 500 if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut();

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        cpf: 'any_cpf',
        rg: 'any_rg',
        birthdate: 'any_birthdate',
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
        rg: 'any_rg',
        birthdate: 'any_birthdate',
        cellphone: 'any_cellphone',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('cpf'));
  });

  test('Should call CpfValidator with correct cpf', () => {
    const { sut, cpfValidatorStub } = makeSut();

    const isValidSpy = jest.spyOn(cpfValidatorStub, 'isValid');

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        cpf: 'any_cpf',
        rg: 'any_rg',
        birthdate: 'any_birthdate',
        cellphone: 'any_cellphone',
      },
    };

    sut.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith('any_cpf');
  });

  test('Should return 500 is CpfValidator throws', () => {
    const { sut, cpfValidatorStub } = makeSut();

    jest.spyOn(cpfValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        cpf: 'any_cpf',
        rg: 'any_rg',
        birthdate: 'any_birthdate',
        cellphone: 'any_cellphone',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should return 400 if birthdate provided is invalid', () => {
    const { sut, dateValidatorStub } = makeSut();

    jest.spyOn(dateValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        cpf: 'any_cpf',
        rg: 'any_rg',
        birthdate: 'any_birthdate',
        cellphone: 'any_cellphone',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('birthdate'));
  });

  test('Should call DateValidator with correct birthdate', () => {
    const { sut, dateValidatorStub } = makeSut();

    const isValidSpy = jest.spyOn(dateValidatorStub, 'isValid');

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        cpf: 'any_cpf',
        rg: 'any_rg',
        birthdate: 'any_birthdate',
        cellphone: 'any_cellphone',
      },
    };

    sut.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith('any_birthdate');
  });

  test('Should return 500 if DateValidator throws', () => {
    const { sut, dateValidatorStub } = makeSut();

    jest.spyOn(dateValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = {
      body: {
        name: 'any_name',
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

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should return 400 if cellphone provided is invalid', () => {
    const { sut, cellphoneValidatorStub } = makeSut();

    jest.spyOn(cellphoneValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpRequest = {
      body: {
        name: 'any_name',
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
    expect(httpResponse.body).toEqual(new InvalidParamError('cellphone'));
  });

  test('Should call CellphoneValidator with correct cellphone', () => {
    const { sut, cellphoneValidatorStub } = makeSut();

    const isValidSpy = jest.spyOn(cellphoneValidatorStub, 'isValid');

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        cpf: 'any_cpf',
        rg: 'any_rg',
        birthdate: 'any_brithdate',
        cellphone: 'any_cellphone',
      },
    };

    sut.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith('any_cellphone');
  });

  test('Should return 500 if CellphoneValidator throws', () => {
    const { sut, cellphoneValidatorStub } = makeSut();

    jest.spyOn(cellphoneValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = {
      body: {
        name: 'any_name',
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

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should call AddAccount with correct value', () => {
    const { sut, addAccountStub } = makeSut();

    const addAccountSpy = jest.spyOn(addAccountStub, 'add');

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        cpf: 'any_cpf',
        rg: 'any_rg',
        birthdate: 'any_brithdate',
        cellphone: 'any_cellphone',
      },
    };

    sut.handle(httpRequest);

    expect(addAccountSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
      cpf: 'any_cpf',
      rg: 'any_rg',
      birthdate: 'any_brithdate',
      cellphone: 'any_cellphone',
    });
  });
});
