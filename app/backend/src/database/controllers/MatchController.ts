import { Request, Response } from 'express';
import MatchesService from '../services/MatchService';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const {
      status, message,
    } = await this.matchesService
      .get(inProgress as string);
    res.status(status).json(message);
  }

  async endMatch(req: Request, res: Response) {
    const { id } = req.params;
    const {
      status, message,
    } = await this.matchesService
      .endMatch(+id);
    res.status(status).json(message);
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const {
      status, message,
    } = await this.matchesService
      .updateMatch(parseInt(id, 10), req.body);
    res.status(status).json(message);
  }

  async registerMatch(req: Request, res: Response) {
    const {
      status, message,
    } = await this.matchesService
      .registerMatch(req.body);
    res.status(status).json(message);
  }
}
