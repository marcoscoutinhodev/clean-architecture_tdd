import {
  HttpRequest,
  HttpResponse,
  Controller,
  DateValidator,
  PhoneNumberValidator,
  AddAccount,
  Dependencies,
  Validation,
} from './signup-protocols';
import { badRequest, ok, serverError } from '../../helpers/http-helper';
import { InvalidParamError } from '../../errors';

export class SignUpController implements Controller {
  private readonly dateValidator: DateValidator;
  private readonly phoneNumberValidator: PhoneNumberValidator;
  private readonly addAccount: AddAccount;
  private readonly validation: Validation;

  constructor(dependecies: Dependencies) {
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
        name, email, password, cpf, rg, birthdate, phoneNumber,
      } = httpRequest.body;

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
