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
  ModelStatic<
  TeamModel
  > = TeamModel;

  public async findAll():
  Promise<ITeam[]> {
    return this.model
      .findAll();
  }

  public async findById(
    id: number,
  ):
    Promise<ITeam | null> {
    return this.model
      .findByPk(id);
  }
}
