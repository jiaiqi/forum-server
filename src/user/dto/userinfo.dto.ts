import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class findUserDto {
  @ApiProperty({ description: '用户名', example: 'jiaqi' })
  username: string;
}

export class UserInfoDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: '用户昵称' })
  nickname: string;

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

  @ApiProperty({ description: '角色' })
  role: string;

  @ApiProperty({ description: '创建时间' })
  createTime: Date;
}
