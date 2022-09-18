import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    description: '用户名',
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  @Length(4, 16, { message: '用户名长度应在4到16位之间' })
  readonly username: string;

  @ApiProperty({
    description: '昵称',
  })
  readonly nickname: string;

  @ApiProperty({
    description: '密码',
  })
  readonly password: string;

  @ApiProperty({
    description: '头像',
    nullable: true,
  })
  readonly avatar: string;

  @ApiProperty({
    description: '邮箱',
    nullable: true, //是否可以为空
  })
  readonly email: string;
}
