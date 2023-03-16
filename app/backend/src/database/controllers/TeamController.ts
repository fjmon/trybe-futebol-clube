import { Request, Response } from 'express';
import ITeamService from '../../interfaces';

export default class TeamController {
  private _service: ITeamService;

  constructor(service: ITeamService) {
    this._service = service;
  }

  public async findAll(req: Request, res: Response) {
    return res.status(200).json(await this._service.findAll());
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    return res.status(200).json(await this._service.findById(+id));
  }
}
