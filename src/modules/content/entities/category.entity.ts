// src/modules/content/entities/category.entity.ts
import {
  BaseEntity,
  Entity,
  ManyToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { PostEntity } from './post.entity';

@Entity('content_categories')
@Tree('materialized-path')
export class CategoryEntity extends BaseEntity {
  // 分类与文章多对多关联
  @ManyToMany((type) => PostEntity, (post) => post.categories)
  posts!: PostEntity[];

  // 子分类
  @TreeChildren({ cascade: true })
  children!: CategoryEntity[];
  // 父分类
  @TreeParent({ onDelete: 'SET NULL' })
  parent?: CategoryEntity | null;
}
