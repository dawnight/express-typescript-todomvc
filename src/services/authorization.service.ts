import jwt from 'jsonwebtoken';

import { JwtTokenInterface, JwtTokenUserInterface } from '../interfaces/services/jwt.token.interface';

import constant from '../config/constant';

const { JWT } = constant;

class AuthorizationService {

  public createCookie(tokenData: JwtTokenInterface) {
    return `Authorization=${tokenData.token};HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

  public createToken(user: JwtTokenUserInterface): JwtTokenInterface {
    const expiresIn = JWT.EXPIRES_IN;
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(user, secret, {
      expiresIn
    });
    // 东八区 加上 8 个小时 8 * 60 * 60
    return {
      token,
      expiresIn: expiresIn * 1000 + +new Date() + 8 * 60 * 60 * 1000
    };
  }

}

export default AuthorizationService;