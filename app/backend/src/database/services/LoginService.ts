import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import geraToken from '../../utils/jwt';
import valida from '../../utils/validador';
import { ILogin, IResponse } from '../../interfaces';
import UsersModel from '../models/UserModel';

export default class LoginService {
  private model: ModelStatic<UsersModel> = UsersModel;

  async login(body: ILogin): Promise<IResponse> {
    const user = await this.model.findOne(
      { where: { email: body.email } },
    );
    if (valida(body) || !user || !(
      bcrypt.compareSync(
        body.password,
        user?.password || '_',
      ))) {
      return {
        status: 401,
        message: {
          message: 'Invalid email or password',
        },
      };
    }
    const { id, username, role, email } = user;
    const token = geraToken({ id, username, role, email });
    return { status: 200, message: { token } };
  }
}
