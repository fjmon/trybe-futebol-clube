import { Request, Response }
  from 'express';
import LeaderboardService
  from '../services/LeaderboardService';

const service = new LeaderboardService();

export default
class LeaderboardController {
  public getHome = async (
    _req: Request,
    res: Response,
  ) => {
    const result = await service
      .getHome();
    return res.status(200)
      .send(result);
  };

  public getAway = async (
    _req: Request,
    res: Response,
  ) => {
    const result = await service
      .getAway();
    return res.status(200)
      .send(result);
  };
}
