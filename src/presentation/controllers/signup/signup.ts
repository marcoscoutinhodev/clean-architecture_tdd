import {
  HttpRequest,
  HttpResponse,
  Controller,
  EmailValidator,
  CpfValidator,
  DateValidator,
  PhoneNumberValidator,
  AddAccount,
  Dependencies,
  Validation,
} from './signup-protocols';
import { badRequest, ok, serverError } from '../../helpers/http-helper';
import { InvalidParamError } from '../../errors';

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly cpfValidator: CpfValidator;
  private readonly dateValidator: DateValidator;
  private readonly phoneNumberValidator: PhoneNumberValidator;
  private readonly addAccount: AddAccount;
  private readonly validation: Validation;

  constructor(dependecies: Dependencies) {
    this.emailValidator = dependecies.emailValidator;
    this.cpfValidator = dependecies.cpfValidator;
    this.dateValidator = dependecies.dateValidator;
    this.phoneNumberValidator = dependecies.phoneNumberValidator;
    this.addAccount = dependecies.addAccount;
    this.validation = dependecies.validation;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);

      if (error) {
        return badRequest(error);
      }

      const {
        name, email, password, passwordConfirmation, cpf, rg, birthdate, phoneNumber,
      } = httpRequest.body;

      const isEmailValid = this.emailValidator.isValid(email);

      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'));
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('password confirmation'));
      }

      const isCpfValid = this.cpfValidator.isValid(cpf);

      if (!isCpfValid) {
        return badRequest(new InvalidParamError('cpf'));
      }

      const isBirthDateValid = this.dateValidator.isValid(birthdate);

      if (!isBirthDateValid) {
        return badRequest(new InvalidParamError('birthdate'));
      }

      const isPhoneNumberValid = this.phoneNumberValidator.isValid(phoneNumber);

      if (!isPhoneNumberValid) {
        return badRequest(new InvalidParamError('phone number'));
      }

      const account = await this.addAccount.add({
        name,
        email,
        password,
        cpf,
        rg,
        birthdate,
        phoneNumber,
      });

      return ok(account);
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
