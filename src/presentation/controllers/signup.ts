import {
  HttpRequest, HttpResponse, Controller, EmailValidator, CpfValidator, DateValidator,
} from '../protocols';
import { badRequest, serverError } from '../helpers/http-helper';
import { MissingParamError, InvalidParamError } from '../errors';

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  private readonly cpfValidator: CpfValidator;

  private readonly dateValidator: DateValidator;

  constructor(emailValidator: EmailValidator, cpfValidator: CpfValidator, dateValidator: DateValidator) {
    this.emailValidator = emailValidator;
    this.cpfValidator = cpfValidator;
    this.dateValidator = dateValidator;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
        'cpf',
        'rg',
        'birthdate',
        'cellphone',
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const {
        email, password, passwordConfirmation, cpf, birthdate,
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

      return {
        statusCode: 200,
        body: {},
      };
    } catch (error) {
      return serverError();
    }
  }
}
