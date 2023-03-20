import { ModelStatic }
  from 'sequelize';
import ITeamService, { ITeam }
  from '../../interfaces';
import TeamModel
  from '../models/TeamModel';

export default
class TeamService
implements ITeamService {
  private model:
  ModelStatic<TeamModel> = TeamModel;

  public async findAll():
  Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  public async findById(id: number):
  Promise<ITeam | null> {
    const teamsId = await this.model.findByPk(id);
    return teamsId;
  }
}
