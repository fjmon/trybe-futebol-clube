import { sign, SignOptions }
  from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env
  .JWT_SECRET as string
  || 'seusecretdetoken';

const geraToken = (
  payload: unknown,
  expiresIn = '7d',
) => {
  const jwtC: SignOptions = {
    expiresIn,
    algorithm: 'HS256',
  };
  const token = sign(
    { payload },
    secret,
    jwtC,
  );
  return token;
};

export default geraToken;
