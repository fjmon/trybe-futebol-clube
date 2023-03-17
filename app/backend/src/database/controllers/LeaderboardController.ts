import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

const service = new LeaderboardService();

export default class LeaderboardController {
  public getAllHome = async (
    _req: Request,
    res: Response,
  ) => {
    const result = await service.getAllHome();
    return res.status(200).send(result);
  };
}
