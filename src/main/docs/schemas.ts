import {
  signUpParamsSchema,
  saveSurveyParamsSchema,
  surveysSchema,
  surveyResultSchema,
  errorSchema,
  surveyAnswerSchema,
  surveySchema,
  addSurveyParamsSchema,
  loginParamsSchema,
  accountSchema,
} from './schemas/';

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  addSurveyParams: addSurveyParamsSchema,
  saveSurveyParams: saveSurveyParamsSchema,
  survey: surveySchema,
  surveys: surveysSchema,
  surveyAnswer: surveyAnswerSchema,
  surveyResult: surveyResultSchema,
  error: errorSchema,
};
