import {
  HttpRequest,
  HttpResponse,
  Controller,
  AddAccount,
  Dependencies,
  Validation,
} from './signup-protocols';
import { badRequest, ok, serverError } from '../../helpers/http-helper';

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount;
  private readonly validation: Validation;

  constructor(dependecies: Dependencies) {
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
