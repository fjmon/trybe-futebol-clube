import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';
import teams from '../mocks/team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa "/teams"', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('Verifica se findAll e getAll funciona', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(teams as TeamModel[]);
    const { status } = await chai.request(app).get('/teams').send(teams);
    expect(status).to.be.eq(200);
  });
});

describe('Testa "/teams/:id"', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('Verifica funcionamento de getById', async () => {
    sinon.stub(TeamModel, 'findByPk').resolves(teams[0] as TeamModel);
    const { status } = await chai.request(app).get('/teams/:id').send(teams);
    expect(status).to.be.eq(200);
  });
});
