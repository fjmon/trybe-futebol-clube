import { Request, Response, Router }
  from 'express';
import loginMiddleware
  from '../middlewares/login.mw';
import LoginController
  from '../database/controllers/LoginController';

const loginController = new LoginController();

const loginRouter = Router();

loginRouter.post(
  '/',
  loginMiddleware,
  (
    req: Request,
    res: Response,
  ) => loginController
    .login(req, res),
);

export default loginRouter;
