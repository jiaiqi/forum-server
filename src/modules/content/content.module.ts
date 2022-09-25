import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../core/core.module';
import { PostController } from './controllers/post.controller';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { PostRepository } from './repositories/post.repository';
import { PostService } from './services/post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    // 注册自定义Repository
    CoreModule.forRepository([PostRepository]),
  ],
  providers: [PostService, CreatePostDto, UpdatePostDto],
  controllers: [PostController],
  exports: [
    PostService,
    // 导出自定义Repository,以供其它模块使用
    CoreModule.forRepository([PostRepository]),
  ],
})
export class ContentModule {}
