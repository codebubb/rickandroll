import { allowedUrls } from '@rickandroll/common-defintions';
import { Request, Response, Router } from 'express';
import * as randomstring from 'randomstring';
import { environment } from '../environments/environment';

const router = Router();

router.post('/shorturl', async (req: Request, res: Response) => {
  const collection = req.app.locals.collection;
  const randomString = randomstring.generate(6);

  const { body } = req;
  const { selectedTargetValue = '' } = body;

  const allowedUrlStrings = allowedUrls.map((allowedUrl) => allowedUrl.url);

  let target: string;

  if (allowedUrlStrings.includes(selectedTargetValue)) {
    target = selectedTargetValue;
  } else {
    target = allowedUrlStrings[0];
  }

  const newLink = {
    id: randomString,
    url: `${environment.apiUrl}/api/${randomString}`,
    target,
  };

  const insertResult = await collection.insertOne(newLink);
  return res.json({ ...insertResult, result: newLink });
});

export { router as ShortUrlRoutes };
