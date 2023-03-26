import { Request, Response, Router }
  from 'express';
import loginMw
  from '../middlewares/login.mw';
import LoginController
  from '../database/controllers/LoginController';
import tokenMw
  from '../middlewares/token.mw';

const loginController = new LoginController();

const loginRouter = Router();

loginRouter.post(
  '/',
  loginMw,
  (
    req: Request,
    res: Response,
  ) => loginController
    .login(req, res),
);
loginRouter.get(
  '/role',
  tokenMw,
  LoginController.getRole,
);

export default loginRouter;
