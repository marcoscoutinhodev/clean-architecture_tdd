import {
  Controller, HttpRequest, HttpResponse, LoadSurveys,
} from './load-surveys-controller-protocols';
import { ok, serverError } from '../../../helpers/http/http-helper';

export class LoadSurveysController implements Controller {
  constructor(
    private readonly loadSurveys: LoadSurveys,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.loadSurveys.load();

      return ok({});
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
