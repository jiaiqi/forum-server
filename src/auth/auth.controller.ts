import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';

@ApiTags('用户')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登录' })
  @Post('login')
  async login(@Body() user: LoginDto) {
    return await this.authService.login(user);
  }
}
