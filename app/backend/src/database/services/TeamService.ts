import { ModelStatic } from 'sequelize';
import ITeamService, { ITeam } from '../../interfaces';
import Team from '../models/TeamModel';

class TeamService implements ITeamService {
  private model: ModelStatic<Team> = Team;

  public async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }
}

export default TeamService;
