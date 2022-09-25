import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PostService } from '../services/post.service';

// 控制器URL的前缀
@Controller('posts')
export class PostController {
  constructor(protected postService: PostService) {}

  @Get(':post')
  async show(@Param('post', new ParseUUIDPipe()) post: string) {
    return this.postService.findOne(post);
  }

  @Post()
  async store(
    @Body(
      new ValidationPipe({
        transform: true,
        forbidUnknownValues: true,
        // 不在错误中暴露target
        validationError: { target: false },
        groups: ['create'],
      }),
    )
    data: CreatePostDto,
  ) {
    return this.postService.create(data);
  }
}
