import LeaderBoard
  from '../../utils/leaderboard';
import TeamModel
  from '../models/TeamModel';

export default class LeaderBoardService {
  private model = TeamModel;

  includeHome = {
    include: [{
      association: 'matchesHome',
      attributes: [
        'homeTeamGoals',
        'awayTeamGoals',
      ],
      where: { inProgress: false },
    },
    ],
  };

  includeAway = {
    include: [{
      association: 'matchesAway',
      attributes: [
        'homeTeamGoals',
        'awayTeamGoals',
      ],
      where: { inProgress: false },
    },
    ],
  };

  async getHome() {
    const matches = await this.model
      .findAll(this.includeHome);
    const planMatches = matches
      .map((team) => team
        .get({ plain: true }));
    const planMatch1 = planMatches
      .map((team) => new LeaderBoard(team));
    const result = planMatch1
      .sort(
        (
          a1,
          b1,
        ) => b1.totalPoints - a1.totalPoints
        || b1.goalsBalance - a1.goalsBalance
        || b1.goalsFavor - a1.goalsFavor
        || b1.goalsOwn - a1.goalsOwn,
      );
    return result;
  }

  async getAway() {
    const matches = await this.model
      .findAll(this.includeAway);
    const planMatches = matches
      .map((team) => team
        .get({ plain: true }));
    const planMatch2 = planMatches
      .map((team) => new LeaderBoard(team));
    const result = planMatch2
      .sort(
        (
          a2,
          b2,
        ) => b2.totalPoints - a2.totalPoints
        || b2.goalsBalance - a2.goalsBalance
        || b2.goalsFavor - a2.goalsFavor
        || b2.goalsOwn - a2.goalsOwn,
      );
    return result;
  }
}
