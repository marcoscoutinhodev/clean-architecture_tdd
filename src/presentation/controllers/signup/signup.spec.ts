import { SignUpController } from './signup';
import {
  CpfValidator,
  DateValidator,
  PhoneNumberValidator,
  AddAccount,
  AddAccountModel,
  AccountModel,
  HttpRequest,
  Validation,
} from './signup-protocols';
import { MissingParamError, InvalidParamError, ServerError } from '../../errors';
import { ok, badRequest, serverError } from '../../helpers/http-helper';

const makeDateValidator = (): DateValidator => {
  class DateValidatorStub implements DateValidator {
    isValid(date: string): boolean {
      return true;
    }
  }

  return new DateValidatorStub();
};

const makePhoneNumberValidator = (): PhoneNumberValidator => {
  class PhoneNumberValidatorStub implements PhoneNumberValidator {
    isValid(phoneNumber: string): boolean {
      return true;
    }
  }

  return new PhoneNumberValidatorStub();
};

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'valid_password',
  cpf: 'valid_cpf',
  rg: 'valid_rg',
  birthdate: 'valid_birthdate',
  phoneNumber: 'valid_phone_number',
});

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountModel): Promise<AccountModel> {
      return new Promise((resolve) => { resolve(makeFakeAccount()); });
    }
  }

  return new AddAccountStub();
};

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): null | Error {
      return null;
    }
  }

  return new ValidationStub();
};

const makeFakeRequest = (): HttpRequest => ({
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
});

interface SutTypes {
  sut: SignUpController
  dateValidatorStub: DateValidator
  phoneNumberValidatorStub: PhoneNumberValidator
  addAccountStub: AddAccount
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const dateValidatorStub = makeDateValidator();
  const phoneNumberValidatorStub = makePhoneNumberValidator();
  const addAccountStub = makeAddAccount();
  const validationStub = makeValidation();

  const sut = new SignUpController({
    dateValidator: dateValidatorStub,
    phoneNumberValidator: phoneNumberValidatorStub,
    addAccount: addAccountStub,
    validation: validationStub,
  });

  return {
    sut,
    dateValidatorStub,
    phoneNumberValidatorStub,
    addAccountStub,
    validationStub,
  };
};

describe('SignUp Controller', () => {
  test('Should return 400 if birthdate provided is invalid', async () => {
    const { sut, dateValidatorStub } = makeSut();

    jest.spyOn(dateValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('birthdate')));
  });

  test('Should call DateValidator with correct birthdate', async () => {
    const { sut, dateValidatorStub } = makeSut();

    const isValidSpy = jest.spyOn(dateValidatorStub, 'isValid');

    await sut.handle(makeFakeRequest());

    expect(isValidSpy).toHaveBeenCalledWith('any_birthdate');
  });

  test('Should return 500 if DateValidator throws', async () => {
    const { sut, dateValidatorStub } = makeSut();

    jest.spyOn(dateValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(serverError(new ServerError()));
  });

  test('Should return 400 if phoneNumber provided is invalid', async () => {
    const { sut, phoneNumberValidatorStub } = makeSut();

    jest.spyOn(phoneNumberValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('phone number')));
  });

  test('Should call PhoneNumberValidator with correct phoneNumber', async () => {
    const { sut, phoneNumberValidatorStub } = makeSut();

    const isValidSpy = jest.spyOn(phoneNumberValidatorStub, 'isValid');

    await sut.handle(makeFakeRequest());

    expect(isValidSpy).toHaveBeenCalledWith('any_phone_number');
  });

  test('Should return 500 if PhoneNumberValidator throws', async () => {
    const { sut, phoneNumberValidatorStub } = makeSut();

    jest.spyOn(phoneNumberValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(serverError(new ServerError()));
  });

  test('Should call AddAccount with correct value', async () => {
    const { sut, addAccountStub } = makeSut();

    const addAccountSpy = jest.spyOn(addAccountStub, 'add');

    await sut.handle(makeFakeRequest());

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

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(serverError(new ServerError()));
  });

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(ok(makeFakeAccount()));
  });

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut();
    const httpRequest = makeFakeRequest();
    const validateSpy = jest.spyOn(validationStub, 'validate');

    await sut.handle(httpRequest);

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'));

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')));
  });
});
