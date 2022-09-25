import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CategoryEntity } from './category.entity';
@Entity('content_posts')
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  // 文章标题
  @Column({ length: 50 })
  title: string;

  // 作者
  @Column({ length: 20 })
  author: string;

  // 内容
  @Column('text')
  content: string;

  // 头像
  @Column({ nullable: true })
  cover_url: string;

  // 评论数量
  // 虚拟字段,在Repository中通过QueryBuilder设置
  commentCount!: number;

  // 文章与分类反向多对多关联
  @ManyToMany((type) => CategoryEntity, (category) => category.posts, {
    cascade: true,
  })
  @JoinTable()
  categories!: CategoryEntity[];
  // 文章与评论一对多关联
  @OneToMany(() => CommentEntity, (comment) => comment.post, {
    cascade: true,
  })
  comments!: CommentEntity[];

  @CreateDateColumn({
    comment: '创建时间',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updatedAt!: Date;
}
