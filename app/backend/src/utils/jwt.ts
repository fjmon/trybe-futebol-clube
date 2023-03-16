import * as jwt
  from 'jsonwebtoken';
import * as dotenv
  from 'dotenv';
import { IPayload }
  from '../interfaces';

dotenv.config();

const secret = process.env
  .JWT_SECRET as string;

const geraToken = (
  user: IPayload,
): string => {
  const {
    id, username, email,
  } = user;
  const payload = {
    id,
    username,
    email,
  };
  return jwt.sign(
    payload,
    secret,

    {
      expiresIn: '1d',
      algorithm: 'HS256',
    },
  );
};
export default geraToken;
