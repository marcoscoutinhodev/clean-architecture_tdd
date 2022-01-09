import express from 'express';

const app = express();

app.listen(4001, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running...');
});
