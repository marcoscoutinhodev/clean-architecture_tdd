import {
  HttpRequest,
  HttpResponse,
  Controller,
  PhoneNumberValidator,
  AddAccount,
  Dependencies,
  Validation,
} from './signup-protocols';
import { badRequest, ok, serverError } from '../../helpers/http-helper';
import { InvalidParamError } from '../../errors';

export class SignUpController implements Controller {
  private readonly phoneNumberValidator: PhoneNumberValidator;
  private readonly addAccount: AddAccount;
  private readonly validation: Validation;

  constructor(dependecies: Dependencies) {
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
