import {
  loginPath, signUpPath, surveyPath, surveyResultPath,
} from './paths';
import {
  badRequest, notFound, serverError, unauthorized, forbidden,
} from './components';
import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  surveyAnswerSchema,
  surveySchema,
  surveysSchema,
  signUpParamsSchema,
  addSurveyParamsSchema,
  saveSurveyParamsSchema,
  surveyResultSchema,
} from './schemas';
import { apiKeyAuthSchema } from './schemas/api-key-auth';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'NodeJS, TypeScript, Clean Achirecture, Tdd, Docker, Ci/Cd, Swagger',
    version: '1.0.0',
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html',
  },
  servers: [{
    url: '/api',
  }],
  tags: [{
    name: 'Login',
  }, {
    name: 'Survey',
  }],
  paths: {
    '/login': loginPath,
    '/signup': signUpPath,
    '/surveys': surveyPath,
    '/surveys/{surveyId}/results': surveyResultPath,
  },
  schemas: {
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
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema,
    },
    badRequest,
    serverError,
    unauthorized,
    forbidden,
    notFound,
  },
};
