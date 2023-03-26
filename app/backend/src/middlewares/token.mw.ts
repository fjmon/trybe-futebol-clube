import { NextFunction, Request, Response }
  from 'express';
import jwt = require ('jsonwebtoken');

const jwtSecret = process.env
  .JWT_SECRET as string
|| 'seusecretdetoken';

const tokenMw = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        message: 'Token not found' });
    }
    const decoded = jwt.verify(token, jwtSecret);
    res.locals.user = decoded;
    next();
  } catch (e) {
    return res.status(401)
      .json({
        message: 'Token must be a valid token' });
  }
};
export default tokenMw;
