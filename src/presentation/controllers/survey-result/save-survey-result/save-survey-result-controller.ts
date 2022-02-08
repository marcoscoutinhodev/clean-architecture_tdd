import {
  Controller, HttpRequest, HttpResponse, LoadSurveyById, SaveSurveyResult,
} from './save-survey-result-controller-protocols';
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper';
import { InvalidParamError } from '@/presentation/errors';

export class SaveSurveyResultController implements Controller {
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params;
      const { answer } = httpRequest.body;
      const survey = await this.loadSurveyById.load(surveyId);

      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'));
      }

      const answers = survey.answers.map((a) => a.answer);

      if (!answers.includes(answer)) {
        return forbidden(new InvalidParamError('answer'));
      }

      const surveyResult = await this.saveSurveyResult.save({
        surveyId,
        accountId: httpRequest.accountId!,
        answer,
        date: new Date(),
      });

      return ok(surveyResult);
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
