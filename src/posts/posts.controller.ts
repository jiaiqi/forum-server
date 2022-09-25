import { PostsService, PostsRo } from './posts.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  RequestMapping,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { findAllPostDto, findByIdDto } from './dto/post.dto';
import { query } from 'express';
@ApiTags('文章')
@Controller('post')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * 创建文章
   * @param post
   */
  @ApiOperation({
    summary: '创建文章',
  })
  @Post()
  @ApiBearerAuth()
  async create(@Body() post: CreatePostDto) {
    return await this.postsService.create(post);
  }

  /**
   * 获取所有文章
   */
  @ApiOperation({
    summary: '获取文章列表',
  })
  @Get('/list')
  @ApiBearerAuth()
  async findAll(@Query() query: findAllPostDto): Promise<PostsRo> {
    return await this.postsService.findAll(query);
  }

  /**
   * 获取指定文章
   * @param id
   */
  @ApiOperation({
    summary: '根据id查找文章',
  })
  @ApiBearerAuth()
  @Get()
  async findById(@Query('id') id: findByIdDto) {
    return await this.postsService.findById(id);
  }

  /**
   * 更新文章
   * @param id
   * @param post
   */
  @ApiOperation({
    summary: '更新文章',
  })
  @Put(':id')
  @ApiBearerAuth()
  async update(@Param('id') id, @Body() post) {
    return await this.postsService.updateById(id, post);
  }

  /**
   * 删除
   * @param id
   */
  @ApiOperation({
    summary: '删除文章',
  })
  @Delete('id')
  @ApiBearerAuth()
  async remove(@Param('id') id) {
    return await this.postsService.remove(id);
  }
}
