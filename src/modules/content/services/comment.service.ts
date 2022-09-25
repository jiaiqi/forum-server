import { EntityManager } from 'typeorm';
import { CommentEntity } from '../entities/comment.entity';

export class CommentService {
  constructor(
    private entityManager: EntityManager,
    private commentEntity: CommentEntity,
  ) {}
}
