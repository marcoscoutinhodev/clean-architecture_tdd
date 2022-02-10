import { Request, Response } from 'express';
import request from 'supertest';
import app from '@/main/config/app';

describe('BodyParser Middleware', () => {
  test('Should parse body to JSON', async () => {
    app.post('/test_body_parser', (req: Request, res: Response) => {
      res.send(req.body);
    });

    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Marcos' })
      .expect({ name: 'Marcos' });
  });
});
