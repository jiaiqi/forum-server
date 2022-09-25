import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('用户')
@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登录' })
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() user: LoginDto) {
    return await this.authService.login(user);
  }

  @ApiOperation({ summary: '获取当前登录用户信息' })
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiBearerAuth()
  getProfile(@Req() req) {
    return req.user;
  }
}
