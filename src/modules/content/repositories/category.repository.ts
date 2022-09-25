import { EntityRepository, TreeRepository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';

// src/modules/content/repositories/category.repository.ts
@EntityRepository(CategoryEntity)
export class CategoryRepository extends TreeRepository<CategoryEntity> {}
