import { Router } from 'express';
import { adaptMiddleware } from '../adapters/express-middleware-adapter';
import { adaptRoute } from '../adapters/express-route-adapter';
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory';
import { makeAuthMiddlware } from '../factories/middlewares/auth-middleware-factory';

export default (router: Router): void => {
  const adminAuth = makeAuthMiddlware('admin');

  router.post('/surveys', adaptMiddleware(adminAuth), adaptRoute(makeAddSurveyController()));
};
