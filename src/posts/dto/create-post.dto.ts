import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
export class CreatePostDto {
  @ApiProperty({
    description: '文章标题',
  })
  @IsString()
  @IsNotEmpty({ message: '文章标题为必填' })
  @MaxLength(255, {
    always: true,
    message: '文章标题长度最大为$constraint1',
  })
  readonly title: string;

  @ApiProperty({
    description: '作者',
  })
  @IsString()
  @IsNotEmpty({ message: '文章作者为必填' })
  readonly author: string;

  @ApiProperty({
    description: '内容',
  })
  @IsString()
  readonly content: string;

  @ApiProperty({
    description: '文章封面',
  })
  readonly cover_url: string;

  @ApiProperty({
    description: '文章类型',
  })
  @IsNumber()
  readonly type: number;
}
