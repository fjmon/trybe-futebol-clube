import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';
import loginMock from '../mocks/login.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa "/login"', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('Verifica funcionamento do login', async () => {
    sinon.stub(UserModel, 'findOne').resolves(loginMock.dbUser as unknown as UserModel);
    const { status } = await chai.request(app).post('/login').send(loginMock.emailPass);
    expect(status).to.be.eq(200);
  });

  it('Verifica necessidade do email', async () =>{
    const { body, status } = await chai.request(app).post('/login').send(loginMock.pass);
    expect(body).to.deep.eq({ message: 'All fields must be filled' });
    expect(status).to.be.eq(400);
  });

  it('Verifica necessidade do password', async () => {
    sinon.stub(UserModel, 'findOne').resolves(loginMock.dbUser as unknown as UserModel);
    const { body, status } = await chai.request(app).post('/login').send(loginMock.email);
    expect(body).to.deep.eq({ message: "All fields must be filled" });
    expect(status).to.be.eq(400);
  });

  it('Verifica se email incorreto não loga', async () => {
    sinon.stub(UserModel, 'findOne').resolves(null);
    const { body, status } = await chai.request(app).post('/login').send(loginMock.wrongEmail);
    expect(body).to.deep.eq({ message: "Invalid email or password" });
    expect(status).to.be.eq(401);
  });

  it('Verifica se password incorreto não loga', async () => {
    const { body, status } = await chai.request(app).post('/login').send(loginMock.wrongPass);
    expect(body).to.deep.eq({ message: "Invalid email or password" });
    expect(status).to.be.eq(401);
  });
});