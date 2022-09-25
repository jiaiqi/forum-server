import { NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { CategoryRepository } from '../repositories/category.repository';

export class CategoryService {
  commentRepository: any;
  constructor(
    private entityManager: EntityManager,
    private categoryRepository: CategoryRepository,
  ) {}

  async findTrees() {
    return this.categoryRepository.findTrees();
  }

  protected async getParent(id?: string) {
    let parent: CommentEntity | undefined;
    if (id !== undefined) {
      if (id === null) return null;
      parent = await this.commentRepository.findOne(id);
      if (!parent) {
        throw new NotFoundException(`Parent comment ${id} not exists!`);
      }
    }
    return parent;
  }
}
