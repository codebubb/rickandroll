import { Router, Request, Response } from 'express';

const router = Router();

router.get('/api/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const findResult = await req.app.locals.collection.findOne({ id });

  if (findResult) {
    const { target = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } =
      findResult;
    return res.redirect(target);
  }

  return res.send('Nothing here');
});

export { router as RedirectUrlRoutes };
