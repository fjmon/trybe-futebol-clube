import { Request, Response, Router }
  from 'express';
import TeamService
  from '../database/services/TeamService';
import TeamController
  from '../database/controllers/TeamController';

const routes = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);

routes.get('/', (req: Request, res: Response) => teamController
  .findAll(req, res));
routes.get('/:id', (req: Request, res: Response) => teamController
  .findById(req, res));

export default routes;
