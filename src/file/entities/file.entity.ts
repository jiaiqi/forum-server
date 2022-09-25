import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('File')
export class FileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number; // 标记为主列，值自动生成

  @Column({ length: 255 })
  filename: string;

  @Column({ length: 255 })
  filepath: string;

  // 特殊列，自动为实体插入日期。无需设置此列，该值将自动设置。
  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;
}
