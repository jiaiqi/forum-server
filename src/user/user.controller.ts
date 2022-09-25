import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Req,
  Get,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { findUserDto } from './dto/userinfo.dto';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '注册用户' })
  @ApiResponse({ status: 201, type: [User] })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  register(@Body() createUser: CreateUserDto) {
    return this.userService.register(createUser);
  }

  @ApiOperation({ summary: '查找用户信息' })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 201, type: [User] })
  @ApiBearerAuth() // swagger文档设置token
  @UseGuards(new JwtAuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Get('')
  async findUser(@Query('username') username: findUserDto) {
    console.log('username', username);

    return await this.userService.getUser(username);
  }
}
