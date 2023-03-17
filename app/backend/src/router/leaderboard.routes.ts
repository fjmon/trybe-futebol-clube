import { Request, Response, Router } from 'express';
import LeaderboardController from '../database/controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/home',
  (
    req: Request,
    res: Response,
  ) => leaderboardController.getAllHome(req, res),
);

export default leaderboardRouter;
