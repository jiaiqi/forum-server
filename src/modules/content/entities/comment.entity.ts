import {
  BaseEntity,
  Entity,
  ManyToOne,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { PostEntity } from './post.entity';

@Entity('content_comments')
@Tree('materialized-path')
export class CommentEntity extends BaseEntity {
  // 评论与文章多对一,并触发`CASCADE`
  @ManyToOne(() => PostEntity, (post) => post.comments, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  post!: PostEntity;

  @TreeChildren({ cascade: true })
  children!: CommentEntity[];

  @TreeParent({ onDelete: 'CASCADE' })
  parent?: CommentEntity | null;
}
