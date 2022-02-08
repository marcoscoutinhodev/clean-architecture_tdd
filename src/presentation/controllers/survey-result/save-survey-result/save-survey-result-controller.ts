import {
  Controller, HttpRequest, HttpResponse, LoadSurveyById,
} from './save-survey-result-controller-protocols';
import { ok } from '@/presentation/helpers/http/http-helper';

export class SaveSurveyResultController implements Controller {
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveyById.load(httpRequest.params.surveyId);

    return ok({});
  }
}
