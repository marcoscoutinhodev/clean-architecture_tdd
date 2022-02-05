import { Router } from 'express';
import { adaptMiddleware } from '../adapters/express-middleware-adapter';
import { adaptRoute } from '../adapters/express-route-adapter';
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory';
import { makeLoadSurveysController } from '../factories/controllers/survey/load-surveys/load-surveys-controller-factory';
import { makeAuthMiddlware } from '../factories/middlewares/auth-middleware-factory';

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddlware('admin'));
  const auth = adaptMiddleware(makeAuthMiddlware());

  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()));
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()));
};
