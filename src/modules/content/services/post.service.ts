import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { PostRepository } from '../repositories/post.repository';

@Injectable()
export class PostService {
  // 此处需要注入`PostRepository`的依赖
  constructor(private postRepository: PostRepository) {}
  // 查询文章列表
  async findList() {}
  // 查询一篇文章的详细信息
  async findOne(id: string) {}
  // 添加文章
  async create(data: CreatePostDto) {}
  // 更新文章
  async update(data: UpdatePostDto) {}
  // 删除文章
  async delete(id: string) {}
}
