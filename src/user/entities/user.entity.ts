// use/entities/user.entity.ts
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 100 })
  username: string; // 用户名

  @Column({ length: 100 })
  nickname: string; //昵称

  @Exclude()
  @Column({})
  password: string; // 密码

  @Column({
    nullable: true, //允许为null
  })
  avatar: string; //头像

  @Column({
    nullable: true, //允许为null
  })
  email: string;

  @Column('simple-enum', {
    default: 'author',
    enum: ['root', 'author', 'visitor'],
  })
  role: string; // 用户角色

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

  @BeforeInsert()
  async encryptPwd() {
    this.password = await bcrypt.hashSync(this.password);
  }
}
