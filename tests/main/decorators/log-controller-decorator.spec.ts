import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator';
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols';
import { ok, serverError } from '@/presentation/helpers/http/http-helper';
import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository';
import { mockAccountModel } from '@/tests/domain/mocks';
import { mockLogErrorRepository } from '@/tests/data/mocks';

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    passwordConfirmation: 'any_password_confirmation',
    cpf: 'any_cpf',
    birthdate: 'any_birthdate',
    phoneNumber: 'any_phone_number',
  },
});

const mockError = async ():Promise<HttpResponse> => {
  const fakeError = new Error();
  fakeError.stack = 'any_stack';

  return serverError(fakeError);
};

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      return ok(mockAccountModel());
    }
  }

  return new ControllerStub();
};

type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
};

const makeSut = (): SutTypes => {
  const controllerStub = makeController();
  const logErrorRepositoryStub = mockLogErrorRepository();
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub);

  return {
    sut,
    controllerStub,
    logErrorRepositoryStub,
  };
};

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, 'handle');

    await sut.handle(mockRequest());

    expect(handleSpy).toHaveBeenCalledWith(mockRequest());
  });

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut();
    const httpReponse = await sut.handle(mockRequest());

    expect(httpReponse).toEqual(ok(mockAccountModel()));
  });

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut();
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError');

    jest.spyOn(controllerStub, 'handle').mockImplementationOnce(() => mockError());

    await sut.handle(mockRequest());

    expect(logSpy).toHaveBeenCalledWith('any_stack');
  });
});
