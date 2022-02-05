import { adaptMiddleware } from '../adapters/express-middleware-adapter';
import { makeAuthMiddlware } from '../factories/middlewares/auth-middleware-factory';

export const adminAuth = adaptMiddleware(makeAuthMiddlware('admin'));
