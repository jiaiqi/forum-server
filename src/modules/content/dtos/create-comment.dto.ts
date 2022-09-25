import { Injectable } from '@nestjs/common';
import { IsDefined, IsUUID } from 'class-validator';

@Injectable()
export class CreatePostDto {
  @IsUUID(undefined, { message: '文章ID格式错误' })
  @IsDefined({ message: '评论文章ID必须指定' })
  post!: string;
}
