import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const findResult = await req.app.locals.collection.findOne({ id });

  if (findResult) {
    const { target = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } =
      findResult;

    const existingRedirects = findResult.redirects || [];

    const ip = (req.headers['x-forwarded-for'] ||
      req.socket.remoteAddress) as string;

    const ipLocalList = ['::1', '127.0.0.1', 'localhost'];

    let userLocation;

    if (ipLocalList.includes(ip)) {
      userLocation = 'Localhost';
    } else {
      const ipLookupRequest = await axios.get(`http://ip-api.com/json/${ip}`);
      const { data } = ipLookupRequest;
      userLocation = `${data.city}, ${data.regionName}, ${data.country}`;
    }

    existingRedirects.push({
      accessed: new Date().toISOString(),
      location: userLocation,
    });

    const replaceResult = await req.app.locals.collection.replaceOne(
      { id },
      { ...findResult, redirects: existingRedirects }
    );

    console.log(replaceResult);

    return res.redirect(target);
  }

  return res.send('Nothing here');
});

router.get('/:id/stats', async (req: Request, res: Response) => {
  const id = req.params.id;
  const findResult = await req.app.locals.collection.findOne({ id });

  if (findResult) {
    return res.json({ status: 'ok', data: findResult });
  }

  return res.status(400).json({
    status: 'error',
    message: 'No short url with that id exists.',
  });
});

export { router as RedirectUrlRoutes };
