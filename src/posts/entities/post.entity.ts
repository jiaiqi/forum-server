//    posts/posts.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('posts')
export class PostsEntity {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  @Column({ length: 50 })
  title: string;

  @Column({ length: 20 })
  author: string;

  @Column('text')
  content: string;

  @Column({ nullable: true })
  cover_url: string;

  @Column('tinyint')
  type: number;

  // 特殊列，自动为实体插入日期。无需设置此列，该值将自动设置。
  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  // 特殊列，在每次调用实体管理器或存储库的`save`时，自动更新实体日期。无需设置此列，该值将自动设置。
  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;
}
