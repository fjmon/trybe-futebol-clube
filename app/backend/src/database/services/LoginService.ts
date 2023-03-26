import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import geraToken from '../../utils/jwt';
import { ILogin, IResponse } from '../../interfaces';
import UsersModel from '../models/UserModel';

export default
class LoginService {
  private model:
  ModelStatic<UsersModel> = UsersModel;

  async login(body: ILogin):
  Promise<IResponse> {
    const response = { status: 401,
      message:
         { message: 'Invalid email or password' } };
    const emailRegex = /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if (!emailRegex.test(body.email)) return response;
    if (body.password.length < 6) return response;
    const local = { where: { email: body.email } };
    const user = await this.model.findOne(local);
    if (!user) return response;
    if (!await bcrypt.compare(body.password, user.password)) return response;
    const { id, username, role, email } = user;
    const token = geraToken({
      id, username, role, email,
    });
    return { status: 200, message: { token } };
  }
}
