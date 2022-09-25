import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import * as dayjs from 'dayjs';
import { FileEntity } from './entities/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity]),
    MulterModule.register({
      storage: diskStorage({
        destination: join(
          __dirname,
          `../public/upload/${dayjs().format('YYYYMMDD')}`,
        ),
        filename: (_, file, callback) => {
          const fileName = `${file.originalname}`;
          return callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
  // exports: [FileService],
})
export class FileModule {}
