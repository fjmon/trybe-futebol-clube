import { Request, Response }
  from 'express';
import MatchesService
  from '../services/MatchService';

export default
class MatchesController {
  constructor(
    private matchesService = new
    MatchesService(),
  ) {}

  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (!inProgress) {
      const {
        status, message,
      } = await this.matchesService
        .getAll();
      return res.status(status).json(message);
    }
    const alt = inProgress === 'true';
    const {
      status, message,
    } = await this.matchesService
      .getProgress(alt);
    return res.status(status).json(message);
  }

  async endMatch(req: Request, res: Response) {
    const { id } = req.params;
    const {
      status, message,
    } = await this.matchesService
      .endMatch(Number(id));
    res.status(status).json({ message });
  }

  async upMatch(req: Request, res: Response) {
    const { id } = req.params;
    const {
      status, message,
    } = await this.matchesService
      .upMatch(parseInt(id, 10), req.body);
    res.status(status).json({ message });
  }

  async registerMatch(req: Request, res: Response) {
    if (req.body.homeTeamId === req.body.awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }
    const {
      status, message,
    } = await this.matchesService
      .registerMatch(req.body);
    res.status(status).json(message);
  }
}
