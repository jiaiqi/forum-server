import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { StrategyOptions, Strategy, ExtractJwt } from 'passport-jwt';
// import { Strategy } from 'passport-local';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

export class JwtStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'GouDanEr',
    } as StrategyOptions);
  }

  async validate(user) {
    const existUser = await this.userRepository.findOne({
      where: { username: user.username },
    });
    // const existUser = await this.authService.getUser(user);
    if (!existUser) {
      throw new UnauthorizedException('token不正确');
    }

    return existUser;
  }
}
