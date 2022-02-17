import {
  Controller, HttpRequest, HttpResponse, LoadSurveyById, LoadSurveyResult,
} from './load-survey-result-controller-protocols';
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper';
import { InvalidParamError } from '@/presentation/errors';

export class LoadSurveyResultController implements Controller {
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params;

      const survey = await this.loadSurveyById.load(surveyId);

      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'));
      }

      const surveyResult = await this.loadSurveyResult.load(surveyId);

      return ok(surveyResult);
    } catch (err) {
      return serverError(err as Error);
    }
  }
}
