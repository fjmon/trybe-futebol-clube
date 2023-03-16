import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

const authenticateToken = (token: string) => jwt.verify(token, secret);

export default authenticateToken;
