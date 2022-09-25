import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const database: () => TypeOrmModuleOptions = () => ({
  // ...
  // 此处entites设置为空即可,我们直接通过在模块内部使用`forFeature`来注册模型
  // 后续魔改框架的时候,我们会通过自定义的模块创建函数来重置entities,以便给自己编写的CLI使用
  // 所以这个配置后面会删除
  entities: [],
  // 自动加载模块中注册的entity
  autoLoadEntities: true,
  // 可以在开发环境下同步entity的数据结构到数据库
  // 后面教程会使用自定义的迁移命令来代替,以便在生产环境中使用,所以以后这个选项会永久false
  synchronize: process.env.NODE_ENV !== 'production',
});
