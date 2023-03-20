import Match
  from '../database/models/MatchModel';
// export interface ITeam {
//   id?: number;
//   teamName: string;
// }

export default
interface ITeamService {
  findAll(): Promise<ITeam[]>;
  findById(id: number):
  Promise<ITeam | null>;
}

export interface ILogin {
  email: string,
  password: string,
}

export interface IPayload {
  id: number;
  email: string;
  password: string;
  role: string;
  username: string;
}

export interface IResponse {
  status: number,
  message: unknown
}

export interface IUpMatch {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IRegMatch {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface IMatch {
  id?: number | string,
  homeTeamId?: number,
  homeTeamGoals: number,
  awayTeamId?: number,
  awayTeamGoals: number,
}

export interface ITeam {
  id: number,
  teamName: string,
  matchesHome?: [Match],
  matchesAway?: [Match],
}
