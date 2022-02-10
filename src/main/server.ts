import 'module-alias/register';
import env from './config/env';
import { MongoHelper } from '@/infra/db';

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default;

    app.listen(env.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running on port ${env.port}..`);
    });
  });
