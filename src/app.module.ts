import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { PostsEntity } from './posts/entities/post.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { database } from './config/dataabase.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(database()),
    PostsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
