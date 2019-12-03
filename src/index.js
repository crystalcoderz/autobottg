import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';
import { connectDatabase } from './connectDB';
import routes from './routes';

const app = express();

app.use(morgan('combined'));
app.use('/', routes);

app.listen(process.env.APP_PORT, async () => {
  console.log(`Server listening on ${process.env.APP_PORT}`);
  await connectDatabase(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_NAME);
});
