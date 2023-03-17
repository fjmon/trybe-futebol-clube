import { Request, Response, Router } from 'express';
import MatchService from '../database/services/MatchService';
import MatchController from '../database/controllers/MatchController';

const routes = Router();

const matchService = new MatchService();
const matchController = new MatchController(matchService);

routes.get(
  '/',
  (req: Request, res: Response) => matchController.getAll(req, res),
);

export default routes;
