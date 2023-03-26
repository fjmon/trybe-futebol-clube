import { NextFunction, Request, Response }
  from 'express';

const loginMw = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // const {
  //   email, password,
  // } = req.body;
  if (!req.body.password || !req.body.email) {
    return res.status(400)
      .json({
        message: 'All fields must be filled',
      });
  }
  next();
};

export default loginMw;
