import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { database } from './config/dataabase.config';
import { FileModule } from './file/file.module';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot(database()),
    PostsModule,
    UserModule,
    AuthModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
