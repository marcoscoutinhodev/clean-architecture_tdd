import { SignUpController } from './signup';
import {
  EmailValidator,
  CpfValidator,
  DateValidator,
  PhoneNumberValidator,
  AddAccount,
  AddAccountModel,
  AccountModel,
} from './signup-protocols';
import { MissingParamError, InvalidParamError, ServerError } from '../../errors';

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: 'valid_password',
        cpf: 'valid_cpf',
        rg: 'valid_rg',
        birthdate: 'valid_birthdate',
        phoneNumber: 'valid_phone_number',
      };

      return new Promise((resolve) => { resolve(fakeAccount); });
    }
  }

  return new AddAccountStub();
};

const makePhoneNumberValidator = (): PhoneNumberValidator => {
  class PhoneNumberValidatorStub implements PhoneNumberValidator {
    isValid(phoneNumber: string): boolean {
      return true;
    }
  }

  return new PhoneNumberValidatorStub();
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
  phoneNumberValidatorStub: PhoneNumberValidator,
  addAccountStub: AddAccount,
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const cpfValidatorStub = makeCpfValidator();
  const dateValidatorStub = makeDateValidator();
  const phoneNumberValidatorStub = makePhoneNumberValidator();
  const addAccountStub = makeAddAccount();

  const sut = new SignUpController(emailValidatorStub, cpfValidatorStub, dateValidatorStub, phoneNumberValidatorStub, addAccountStub);

  return {
    sut,
    emailValidatorStub,
    cpfValidatorStub,
    dateValidatorStub,
    phoneNumberValidatorStub,
    addAccountStub,
  };
};

describe('SignUp Controller', () => {
  test('Should return 400 if name is not provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        cpf: 'any_cpf',
        rg: 'any_rg',
        birthdate: 'any_birthdate',
        phoneNumber: 'any_phone_number',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  test('Should return 400 if email is not provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        cpf: 'any_cpf',
        rg: 'any_rg',
        birthdate: 'any_birthdate',
        phoneNumber: 'any_phone_number',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  test('Should return 400 if password is not provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        passwordConfirmation: 'any_password',
        cpf: 'any_cpf',
        rg: 'any_rg',
        birthdate: 'any_birthdate',
        phoneNumber: 'any_phone_number',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  test('Should return 400 if passwordConfirmation is not provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        cpf: 'any_cpf',
        rg: 'any_rg',
        birthdate: 'any_birthdate',
        phoneNumber: 'any_phone_number',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'));
  });

  test('Should return 400 if password confirmation fails', async () => {
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
        phoneNumber: 'any_phone_number',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('password confirmation'));
  });

  test('Should return 400 if cpf is not provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        rg: 'any_rg',
        birthdate: 'any_birthdate',
        phoneNumber: 'any_phone_number',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('cpf'));
  });

  test('Should return 400 if rg is not provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        cpf: 'any_cpf',
        birthdate: 'any_birthdate',
        phoneNumber: 'any_phone_number',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('rg'));
  });

  test('Should return 400 if birthdate is not provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        cpf: 'any_cpf',
        rg: 'any_rg',
        phoneNumber: 'any_phone_number',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('birthdate'));
  });

  test('Should return 400 if phoneNumber is not provided', async () => {
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

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('phoneNumber'));
  });

  test('Should return 400 if email provided is invalid', async () => {
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
        phoneNumber: 'any_phone_number',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  test('Should call EmailValidator with correct email', async () => {
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
        phoneNumber: 'any_phone_number',
      },
    };

    await sut.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com');
  });

  test('Should return 500 if EmailValidator throws', async () => {
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
        phoneNumber: 'any_phone_number',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should return 400 if cpf provided is invalid', async () => {
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
        phoneNumber: 'any_phone_number',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('cpf'));
  });

  test('Should call CpfValidator with correct cpf', async () => {
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
        phoneNumber: 'any_phone_number',
      },
    };

    await sut.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith('any_cpf');
  });

  test('Should return 500 is CpfValidator throws', async () => {
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
        phoneNumber: 'any_phone_number',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should return 400 if birthdate provided is invalid', async () => {
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
        phoneNumber: 'any_phone_number',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('birthdate'));
  });

  test('Should call DateValidator with correct birthdate', async () => {
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
        phoneNumber: 'any_phone_number',
      },
    };

    await sut.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith('any_birthdate');
  });

  test('Should return 500 if DateValidator throws', async () => {
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
        birthdate: 'any_birthdate',
        phoneNumber: 'any_phone_number',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should return 400 if phoneNumber provided is invalid', async () => {
    const { sut, phoneNumberValidatorStub } = makeSut();

    jest.spyOn(phoneNumberValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        cpf: 'any_cpf',
        rg: 'any_rg',
        birthdate: 'any_birthdate',
        phoneNumber: 'any_phone_number',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('phone number'));
  });

  test('Should call PhoneNumberValidator with correct phoneNumber', async () => {
    const { sut, phoneNumberValidatorStub } = makeSut();

    const isValidSpy = jest.spyOn(phoneNumberValidatorStub, 'isValid');

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        cpf: 'any_cpf',
        rg: 'any_rg',
        birthdate: 'any_birthdate',
        phoneNumber: 'any_phone_number',
      },
    };

    await sut.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith('any_phone_number');
  });

  test('Should return 500 if PhoneNumberValidator throws', async () => {
    const { sut, phoneNumberValidatorStub } = makeSut();

    jest.spyOn(phoneNumberValidatorStub, 'isValid').mockImplementationOnce(() => {
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
        phoneNumber: 'any_phone_number',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should call AddAccount with correct value', async () => {
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
        birthdate: 'any_birthdate',
        phoneNumber: 'any_phone_number',
      },
    };

    await sut.handle(httpRequest);

    expect(addAccountSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
      cpf: 'any_cpf',
      rg: 'any_rg',
      birthdate: 'any_birthdate',
      phoneNumber: 'any_phone_number',
    });
  });

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut();

    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => new Promise((resolve, reject) => {
      reject(new Error());
    }));

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        cpf: 'any_cpf',
        rg: 'any_rg',
        birthdate: 'any_birthdate',
        phoneNumber: 'any_phone_number',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should return 200 if valid data is provided', async () => {
    const { sut, addAccountStub } = makeSut();
    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: 'valid_password',
        passwordConfirmation: 'valid_password',
        cpf: 'valid_cpf',
        rg: 'valid_rg',
        birthdate: 'valid_birthdate',
        phoneNumber: 'valid_phone_number',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password',
      cpf: 'valid_cpf',
      rg: 'valid_rg',
      birthdate: 'valid_birthdate',
      phoneNumber: 'valid_phone_number',
    });
  });
});
