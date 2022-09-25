import { UserService } from './../user/user.service';
import { Injectable, BadRequestException, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { compareSync } from 'bcryptjs';

import {
  AccessTokenInfo,
  AccessConfig,
  WechatError,
  WechatUserInfo,
} from './auth.interface';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private httpService: HttpService, // private userRepository: Repository<User>,
  ) {}
  private accessTokenInfo: AccessTokenInfo;
  public apiServer = 'https://api.weixin.qq.com';

  createToken(user: Partial<User>) {
    return this.jwtService.sign(user);
  }

  async login(user: Partial<User>) {
    // 因为密码是加密后的，没办法直接对比用户名密码，只能先根据用户名查出用户，再比对密码
    if (!user) {
      throw new BadRequestException('用户名不正确！');
    }
    const existUser = await this.userService.findOne(user.username);
    if (!compareSync(user.password, existUser.password)) {
      throw new BadRequestException('密码错误！');
    }
    const token = this.createToken({
      // id: user.id,
      username: existUser.username,
      role: existUser.role,
    });
    return { token, ...existUser };
  }

  async getUser(user: User) {
    return await this.userService.findOne(user.id);
  }

  async getUserInfo() {
    const result: AxiosResponse<WechatError & WechatUserInfo> =
      await lastValueFrom(
        this.httpService.get(
          `${this.apiServer}/sns/userinfo?access_token=${this.accessTokenInfo.accessToken}&openid=${this.accessTokenInfo.openid}`,
        ),
      );
    if (result.data.errcode) {
      throw new BadRequestException(
        `[getUserInfo] errcode:${result.data.errcode}, errmsg:${result.data.errmsg}`,
      );
    }
    return result.data;
  }

  async getAccessToken(code) {
    const { APPID, APPSECRET } = process.env;
    if (!APPSECRET) {
      throw new BadRequestException('[getAccessToken]必须有appSecret');
    }
    if (
      !this.accessTokenInfo ||
      (this.accessTokenInfo && this.isExpires(this.accessTokenInfo))
    ) {
      // 请求accessToken数据
      const res: AxiosResponse<WechatError & AccessConfig, any> =
        await lastValueFrom(
          this.httpService.get(
            `${this.apiServer}/sns/oauth2/access_token?appid=${APPID}&secret=${APPSECRET}&code=${code}&grant_type=authorization_code`,
          ),
        );

      if (res.data.errcode) {
        throw new BadRequestException(
          `[getAccessToken] errcode:${res.data.errcode}, errmsg:${res.data.errmsg}`,
        );
      }
      this.accessTokenInfo = {
        accessToken: res.data.access_token,
        expiresIn: res.data.expires_in,
        getTime: Date.now(),
        openid: res.data.openid,
      };
    }

    return this.accessTokenInfo.accessToken;
  }

  isExpires(access) {
    return Date.now() - access.getTime > access.expiresIn * 1000;
  }
}
