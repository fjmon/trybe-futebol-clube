import { DataTypes, Model } from 'sequelize';
import db from '.';
import Team from './TeamModel';

export default class Match extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    timestamps: false,
    underscored: true,
    tableName: 'matches',
  },
);

Match.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Team.hasMany(Match, { foreignKey: 'homeTeamId', as: 'matchesHome' });

Match.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });
Team.hasMany(Match, { foreignKey: 'awayTeamId', as: 'matchesAway' });
