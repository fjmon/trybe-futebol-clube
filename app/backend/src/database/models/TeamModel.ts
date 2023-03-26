import { Model, DataTypes }
  from 'sequelize';
import db from '.';
// import Match from './MatchModel';

export default class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'TeamModel',
  timestamps: false,
  tableName: 'teams',
});

// Match.belongsTo(Team, {
//   foreignKey: 'homeTeamId',
//   as: 'homeTeam',
// });
// Team.hasMany(Match, {
//   foreignKey: 'homeTeamId',
//   as: 'matchesHome',
// });

// Match.belongsTo(Team, {
//   foreignKey: 'awayTeamId',
//   as: 'awayTeam',
// });
// Team.hasMany(Match, {
//   foreignKey: 'awayTeamId',
//   as: 'matchesAway',
// });

// Match.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });
// Team.hasMany(Match, { foreignKey: 'homeTeamId', as: 'matchesHome' });

// Match.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });
// Team.hasMany(Match, { foreignKey: 'awayTeamId', as: 'matchesAway' });

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });
