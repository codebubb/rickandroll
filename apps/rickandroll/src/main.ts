/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import { environment } from './environments/environment';
import { ShortUrlRoutes } from './routes/ShortUrlRoutes';
import * as cors from 'cors';
import { RedirectUrlRoutes } from './routes/RedirectUrlRoutes';

const url = environment.dbConnectionString;
const client = new MongoClient(url);
const dbName = 'rickandroll';

const app = express();
app.use(express.json());
app.use(cors());
app.use(ShortUrlRoutes);
app.use(RedirectUrlRoutes);

const connectToDatabase = async () => {
  await client.connect();
  console.log('Connected to Database Server');
  const db = client.db(dbName);
  app.locals.collection = db.collection('urls');
};

connectToDatabase().then(console.log).catch(console.error);
// .finally(() => client.close());

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', (error) => {
  console.error(error);
});
