import { Request, Response, Router } from 'express';
import LeaderboardController
  from '../database/controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/home',
  (
    req: Request,
    res: Response,
  ) => leaderboardController
    .getHome(req, res),
);
leaderboardRouter.get(
  '/away',
  (
    req: Request,
    res: Response,
  ) => leaderboardController
    .getAway(req, res),
);

export default leaderboardRouter;
