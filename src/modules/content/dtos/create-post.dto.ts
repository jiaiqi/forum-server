import { Injectable } from '@nestjs/common';
import { IsNotEmpty, IsOptional, IsUUID, MaxLength } from 'class-validator';

@Injectable()
export class CreatePostDto {
  @MaxLength(255, {
    always: true,
    message: '文章标题长度最大为$constraint1',
  })
  @IsNotEmpty({ groups: ['create'], message: '文章标题必须填写' })
  @IsOptional({ groups: ['update'] })
  title!: string;

  @IsUUID(undefined, { each: true, always: true, message: '分类ID格式错误' })
  @IsOptional({ always: true })
  categories?: string[];
}
