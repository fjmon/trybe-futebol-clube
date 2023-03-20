import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import geraToken from '../../utils/jwt';
import valida from '../../utils/validador';
import { ILogin, IResponse } from '../../interfaces';
import UsersModel from '../models/UserModel';

export default
class LoginService {
  private model:
  ModelStatic<UsersModel> = UsersModel;

  async login(body: ILogin):
  Promise<IResponse> {
    const local = { where: { email: body.email } };
    const user = await this.model.findOne(local);
    const error = valida(body);
    const verify = bcrypt
      .compareSync(body.password, user?.password || '_');
    if (error || !user || !verify) {
      return { status: 401,
        message:
           { message: 'Invalid email or password' } };
    }
    const { id, username, role, email } = user;
    const token = geraToken({
      id, username, role, email,
    });
    return { status: 200, message: { token } };
  }
}
