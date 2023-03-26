import { ModelStatic } from 'sequelize';
import { IResponse, IRegMatch, IUpMatch }
  from '../../interfaces';
import Matche from '../models/MatchModel';
import Team from '../models/TeamModel';

export default class MatcheService {
  private model: ModelStatic<
  Matche
  > = Matche;

  async getAll(): Promise<IResponse> {
    const matches = await this.model
      .findAll({
        include: [
          { model: Team,
            as: 'homeTeam',
            attributes: ['teamName'] },
          { model: Team,
            as: 'awayTeam',
            attributes: ['teamName'] },
        ],
      });
    return {
      status: 200, message: matches,
    };
  }

  async getProgress(
    inProgress: boolean,
  ): Promise<IResponse> {
    const matches = await this.model
      .findAll({
        include: [
          { model: Team,
            as: 'homeTeam',
            attributes: ['teamName'] },
          { model: Team,
            as: 'awayTeam',
            attributes: ['teamName'] },
        ],
        where: { inProgress },
      });
    return {
      status: 200, message: matches,
    };
  }

  async endMatch(
    id: number,
  ): Promise<IResponse> {
    await this.model
      .update(
        { inProgress: false },
        { where: { id } },
      );
    return {
      status: 200, message: 'Finished',
    };
  }

  async upMatch(
    id: number,
    body: IUpMatch,
  ): Promise<IResponse> {
    await this.model
      .update(
        { ...body },
        { where: { id } },
      );
    return {
      status: 200, message: 'Updated',
    };
  }

  async registerMatch(
    body: IRegMatch,
  ): Promise<IResponse> {
    const homeTeam = await this.model
      .findByPk(body.homeTeamId);
    const awayTeam = await this.model
      .findByPk(body.awayTeamId);

    if (!homeTeam || !awayTeam) {
      return { status: 404,
        message: {
          message: 'There is no team with such id!',
        } };
    }
    return {
      status: 201,
      message: await this.model
        .create({
          ...body, inProgress: true,
        }) };
  }
}
