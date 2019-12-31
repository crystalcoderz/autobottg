import express from 'express';
import 'dotenv/config';
import { connectDatabase } from './connectDB';
import routes from './routes';
import StatusWorker from './services/StatusWorker';
import { bot, initBot } from './bot';

if (process.env.NODE_ENV !== 'development') {
  const Sentry = require('@sentry/node');
  Sentry.init({ dsn: 'https://5cb3a2887880470bb072da83411cab38@sentry.io/1862192' });
}

const app = express();

app.use('/', routes);

app.use(bot.webhookCallback('/webhook'));

app.listen(process.env.APP_PORT, async () => {
  console.log(`Server listening on ${process.env.APP_PORT}`);
  await initBot();
  await connectDatabase(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_NAME);
  await StatusWorker.run();
});
