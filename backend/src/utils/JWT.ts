import { IUser } from "../interfaces";
import { verify, sign, SignOptions, JwtPayload } from 'jsonwebtoken';
import fs from 'fs';

const SECRET = 'secret';

interface IJWTConfig {
  algorithm: string;
  expiresIn: string;
}

const createToken =  (payload: IUser) => {

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = sign({payload}, "secret", jwtConfig as SignOptions)

  return token;
};

const validateToken = (token: string) => verify(token, "secret") as JwtPayload;

export {
  createToken,
  validateToken,
};
