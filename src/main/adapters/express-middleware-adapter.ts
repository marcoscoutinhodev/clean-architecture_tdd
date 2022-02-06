import { NextFunction, Request, Response } from 'express';
import { Middleware, HttpRequest, HttpResponse } from '@/presentation/protocols';

export const adaptMiddleware = (middleware: Middleware) => (
  async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = { headers: req.headers };

    const { statusCode, body }: HttpResponse = await middleware.handle(httpRequest);

    if (statusCode !== 200) {
      return res
        .status(statusCode)
        .json({ error: body.message });
    }

    Object.assign(req, body);

    return next();
  });
