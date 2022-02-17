import {
  Controller, HttpRequest, HttpResponse, LoadSurveyById,
} from './load-survey-result-controller-protocols';
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper';
import { InvalidParamError } from '@/presentation/errors';

export class LoadSurveyResultController implements Controller {
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params;

      const survey = await this.loadSurveyById.load(surveyId);

      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'));
      }

      return ok({});
    } catch (err) {
      return serverError(err as Error);
    }
  }
}
