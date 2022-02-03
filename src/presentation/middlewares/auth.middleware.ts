import { AccessDeniedError } from '../errors';
import { forbidden } from '../helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '../protocols';

export class AuthMiddleware implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return new Promise((resolve) => { resolve(forbidden(new AccessDeniedError())); });
  }
}
