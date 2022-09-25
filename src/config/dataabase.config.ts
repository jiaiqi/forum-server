import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { FileEntity } from 'src/file/entities/file.entity';
import { PostsEntity } from 'src/posts/entities/post.entity';

export const database: () => TypeOrmModuleOptions = () => ({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'blog',
  entities: [],
  // entities: ['dist/**/*.entity{.ts,.js}', PostsEntity, FileEntity],
  autoLoadEntities: true, // 自动加载实体
  synchronize: false, // 自动载入的模型将同步
  dropSchema: false, //每次建立连接时删除架构
  // 此处entites设置为空即可,我们直接通过在模块内部使用`forFeature`来注册模型
  // 自动加载模块中注册的entity
  // synchronize: process.env.NODE_ENV !== 'production',
});
