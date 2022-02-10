import { apiKeyAuthSchema } from './schemas/api-key-auth';
import {
  unauthorized, notFound, forbidden, serverError, badRequest,
} from './components/';

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema,
  },
  badRequest,
  serverError,
  unauthorized,
  forbidden,
  notFound,
};
