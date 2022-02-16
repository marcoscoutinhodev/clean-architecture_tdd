import {
  signUpParamsSchema,
  saveSurveyParamsSchema,
  surveysSchema,
  surveyResultSchema,
  surveyResultAnswerSchema,
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
  surveyResultAnswer: surveyResultAnswerSchema,
  error: errorSchema,
};
