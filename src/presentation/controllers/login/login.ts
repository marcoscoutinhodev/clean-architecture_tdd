import {
  Controller, HttpRequest, HttpResponse, EmailValidator, Authentication,
} from './login-protocols';
import { ok, badRequest, serverError } from '../../helpers/http-helper';
import { InvalidParamError, MissingParamError } from '../../errors';

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly authentication: Authentication;

  constructor(emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator;
    this.authentication = authentication;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;

      if (!email) {
        return badRequest(new MissingParamError('email'));
      }

      if (!password) {
        return badRequest(new MissingParamError('password'));
      }

      const isEmailValid = this.emailValidator.isValid(email);

      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'));
      }

      this.authentication.auth(email, password);

      return ok('');
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
