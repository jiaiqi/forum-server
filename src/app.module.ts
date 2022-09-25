import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { PostsEntity } from './posts/entities/post.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './modules/core/core.module';
import { database } from './config/dataabase.config';
import { ContentModule } from './modules/content/content.module';

@Module({
  imports: [
    CoreModule.forRoot(database()),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '123456',
    //   database: 'blog',
    //   entities: ['dist/**/*.entity{.ts,.js}', PostsEntity],
    //   autoLoadEntities: true, // 自动加载实体
    //   synchronize: true, // 自动载入的模型将同步
    // }),
    ContentModule,
    PostsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
