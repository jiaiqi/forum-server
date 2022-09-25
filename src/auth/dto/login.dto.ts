import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: '用户名',
    example: 'jiaqi',
  })
  @IsString()
  @IsNotEmpty({ message: '请输入用户名' })
  readonly username: string;

  @ApiProperty({
    description: '密码',
    example: '542698',
  })
  @IsString()
  @IsNotEmpty({ message: '请输入密码' })
  readonly password: string;
}
