import { Request, Response }
  from 'express';
import LoginService
  from '../services/LoginService';

export default
class LoginController {
  private service:
  LoginService = new LoginService();

  async login(
    req: Request,
    res: Response,
  ) {
    const {
      status,
      message,
    } = await this.service
      .login(req.body);
    res.status(status)
      .json(message);
  }
}
