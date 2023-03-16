import * as joi from 'joi';
import { ILogin }
  from '../interfaces';

const logins = {
  email: joi.string()
    .email().required(),
  password: joi.string()
    .min(6).required(),
};
const loginSchema = joi
  .object(logins);

const valida = (
  body: ILogin,
) => {
  const { error } = loginSchema
    .validate(body);
  if (error) return error.message;
  return null;
};

export default valida;
