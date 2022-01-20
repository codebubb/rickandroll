import { Request, Response, Router } from 'express';
import * as randomstring from 'randomstring';

const router = Router();

router.post('/shorturl', async (req: Request, res: Response) => {
  const collection = req.app.locals.collection;
  const randomString = randomstring.generate(6);
  const newLink = {
    id: randomString,
    url: `http://localhost:3333/api/${randomString}`,
  };

  const insertResult = await collection.insertOne(newLink);
  return res.json({ ...insertResult, result: newLink });
});

export { router as ShortUrlRoutes };
