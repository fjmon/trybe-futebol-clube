import { Request, Response, Router } from 'express';
import tokenMiddleware from '../middlewares/token.mw';
import MatchesController from '../database/controllers/MatchController';

const matchesController = new MatchesController();

const matchesRouter = Router();

matchesRouter.get('/', (req: Request, res: Response) => matchesController.getAll(req, res));
matchesRouter.patch(
  '/:id/finish',
  tokenMiddleware,
  (req: Request, res: Response) => matchesController
    .endMatch(req, res),
);
matchesRouter.patch(
  '/:id',
  tokenMiddleware,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);

matchesRouter.post('/', tokenMiddleware, (req: Request, res: Response) =>
  matchesController.registerMatch(req, res));

export default matchesRouter;
