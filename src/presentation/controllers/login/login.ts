import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { badRequest, ok } from '../../helpers/http-helper';
import { MissingParamError } from '../../errors';

export class LoginController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body;

    if (!email) {
      return badRequest(new MissingParamError('email'));
    }

    if (!password) {
      return badRequest(new MissingParamError('password'));
    }

    return ok('');
  }
}
