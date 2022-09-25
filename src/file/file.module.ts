import { Module } from '@nestjs/common';
import { UploadService } from './file.service';
import { UploadController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import * as dayjs from 'dayjs';

@Module({
  imports: [
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
  controllers: [UploadController],
  providers: [UploadService],
})
export class FileModule {}
