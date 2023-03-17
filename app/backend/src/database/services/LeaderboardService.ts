import LeaderBoard from '../../utils/leaderboard';
import TeamModel from '../models/TeamModel';

export default class LeaderBoardService {
  private model = TeamModel;

  async getAllHome() {
    return this.model.findAll({
      include: [{
        association: 'matchesHome',
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
        where: { inProgress: false },
      },
      ],
    })
      .then((result) => result.map((team) => team.get({ plain: true })))
      .then((result) => result.map((team) => new LeaderBoard(team)))
      .then((result) => result
        .sort((a, b) => b.totalPoints - a.totalPoints
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || b.goalsOwn - a.goalsOwn));
  }
}
