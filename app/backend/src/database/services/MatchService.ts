import { ModelStatic } from 'sequelize';
import { IResponse, IRegMatch, IUpMatch }
  from '../../interfaces';
import Matche from '../models/MatchModel';
import Team from '../models/TeamModel';

export default class MatcheService {
  private model: ModelStatic<Matche> = Matche;

  async get(inProgress: string): Promise<IResponse> {
    const matches = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    if (!inProgress) return { status: 200, message: matches };

    const progressTrue = matches.filter((match) => match.inProgress);
    const progressFalse = matches.filter((match) => !match.inProgress);

    if (inProgress === 'true') return { status: 200, message: progressTrue };
    if (inProgress === 'false') return { status: 200, message: progressFalse };

    return { status: 200, message: matches };
  }

  async endMatch(id: number): Promise<IResponse> {
    await this.model.update({ inProgress: false }, { where: { id } });
    return { status: 200, message: { message: 'Finished' } };
  }

  async updateMatch(id: number, body: IUpMatch): Promise<IResponse> {
    const match = await this.model.findByPk(id);
    if (match?.inProgress) {
      await this.model.update({ ...body }, { where: { id } });
    }
    return { status: 200, message: { message: 'Updated' } };
  }

  async registerMatch(body: IRegMatch): Promise<IResponse> {
    if (body.homeTeamId === body.awayTeamId) {
      return { status: 422,
        message: { message: 'It is not possible to create a match with two equal teams' } };
    }

    const homeTeam = await this.model.findByPk(body.homeTeamId);
    const awayTeam = await this.model.findByPk(body.awayTeamId);

    if (!homeTeam || !awayTeam) {
      return { status: 404, message: { message: 'There is no team with such id!' } };
    }
    const match = await this.model.create({ ...body, inProgress: true });
    return { status: 201, message: match };
  }
}
