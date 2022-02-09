import { Request, Response } from 'express';
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols';

export const adaptRoute = (controller: Controller) => async (req: Request, res: Response) => {
  const httpRequest: HttpRequest = {
    body: req.body,
    params: req.params,
    accountId: req.accountId,
  };
  const { statusCode, body }: HttpResponse = await controller.handle(httpRequest);

  if (statusCode !== 200 && statusCode !== 204) {
    return res
      .status(statusCode)
      .json({ error: body.message });
  }

  return res
    .status(statusCode)
    .json(body);
};
