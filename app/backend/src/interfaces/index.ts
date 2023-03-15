export interface ITeam {
  id?: number;
  teamName: string;
}

export default interface ITeamService {
  findAll(): Promise<ITeam[]>;
  findById(id: number): Promise<ITeam | null>;
}
