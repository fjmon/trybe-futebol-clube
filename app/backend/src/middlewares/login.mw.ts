import { NextFunction, Request, Response }
  from 'express';

const loginMw = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.password || !req.body.email) {
    return res.status(400)
      .json({
        message: 'All fields must be filled',
      });
  }
  next();
};

export default loginMw;
