import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET as string;

const tokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401)
        .json({ message: 'Token not found' });
    }
    const decoded = verify(token, jwtSecret);
    res.locals.user = decoded;
    next();
  } catch (err) {
    return res.status(401)
      .json({ message: 'Token must be a valid token' });
  }
};
export default tokenMiddleware;
