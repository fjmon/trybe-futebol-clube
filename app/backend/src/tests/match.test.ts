import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import matchMock from '../mocks/match.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa "/matches"', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('Verifica se find All e getAll funciona', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(matchMock as unknown as MatchModel[]);
    const { status } = await chai.request(app).get('/matches');
    expect(status).to.eq(200);
  });

  it('Verifica funcionamento getAll com inProgress', async () => {
    const result = matchMock.filter((item) => item.inProgress === true);
    sinon.stub(MatchModel, 'findAll').resolves(result as unknown as MatchModel[]);
    const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    expect(status).to.eq(200);
    expect(body).to.deep.eq(result);
  })
});
