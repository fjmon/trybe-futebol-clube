import { ITeam, IMatch }
  from '../interfaces';

export default
class LeaderBoard {
  name: string;
  totalPoints = 0;
  totalGames = 0;
  totalVictories = 0;
  totalDraws = 0;
  totalLosses = 0;
  goalsFavor = 0;
  goalsOwn = 0;
  goalsBalance = 0;
  efficiency = 100.00;

  constructor(team: ITeam) {
    this.resolveLeaderboard(team);
    this.name = team.teamName;
  }

  draw() {
    this.totalPoints += 1;
    this.totalDraws += 1;
  }

  winner() {
    this.totalPoints += 3;
    this.totalVictories += 1;
  }

  getEfficiency() {
    const efficiency = Number(
      ((
        this.totalPoints / (this.totalGames * 3)
      ) * 100)
        .toFixed(2),
    );
    return efficiency;
  }

  goals(matches: IMatch[], local: boolean) {
    if (!local) {
      matches.forEach((match) => {
        this.goalsOwn += match.homeTeamGoals;
        this.goalsFavor += match.awayTeamGoals;
        this.goalsBalance = this
          .goalsFavor - this.goalsOwn;
      });
    } else {
      matches.forEach((match) => {
        this.goalsOwn += match.awayTeamGoals;
        this.goalsFavor += match.homeTeamGoals;
        this.goalsBalance = this
          .goalsFavor - this.goalsOwn;
      });
    }
  }

  resolveLeaderboard(team: ITeam) {
    if (team.matchesAway) {
      this.totalGames += team.matchesAway.length;
      this.goals(team.matchesAway, false);
      team.matchesAway.forEach((match) => {
        if (match.awayTeamGoals < match.homeTeamGoals) this.totalLosses += 1;
        else if (match.awayTeamGoals > match.homeTeamGoals) this.winner();
        else this.draw();
      });
    }

    if (team.matchesHome) {
      this.totalGames += team.matchesHome.length;
      this.goals(team.matchesHome, true);
      team.matchesHome.forEach((match) => {
        if (match.homeTeamGoals < match.awayTeamGoals) this.totalLosses += 1;
        else if (match.homeTeamGoals > match.awayTeamGoals) this.winner();
        else this.draw();
      });
    } this.efficiency = this.getEfficiency();
  }
}
