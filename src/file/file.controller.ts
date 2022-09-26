import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Query,
  Body,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { join } from 'path';
import * as dayjs from 'dayjs';
import { zip } from 'compressing';
import { downloadDto, uploadDto } from './dto/file.dto';
import { createWriteStream } from 'fs';
@ApiTags('文件')
@Controller('file')
export class FileController {
  constructor(private readonly FileService: FileService) {}

  @ApiOperation({
    summary: '上传文件',
  })
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@Body() body: uploadDto, @UploadedFile() file) {
    const res = {
      filepath: `/api/file/download?filename=${dayjs().format('YYYYMMDD')}_${
        file.originalname
      }`,
      // filepath: join(
      //   __dirname,
      //   `../public/upload/${dayjs().format('YYYYMMDD')}/${file.originalname}`,
      // ),
      filename: `${dayjs().format('YYYYMMDD')}_${file.originalname}`,
    };
    const createFile = await this.FileService.create(res);
    console.log(createFile);

    return {
      filepath: res.filepath,
      filename: file.originalname,
      fileid: createFile.id,
      __msg: '上传成功',
      createTime: createFile.createTime,
    };
  }

  @ApiOperation({
    summary: '批量上传文件',
  })
  @Post('batch-upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('files'))
  batchUpload(@Body() body: uploadDto, @UploadedFile() files) {
    for (const file of files) {
      const fileUrl = join(
        __dirname,
        '../../public/upload',
        `${Date.now()}/${file.originalname}`,
      );
      const writeImage = createWriteStream(fileUrl);
      writeImage.write(file.buffer);
    }
    return '上传图片成功';
  }

  @ApiOperation({
    summary: '获取文件下载链接',
  })
  @Get('download')
  downLoad(@Query() req: downloadDto, @Res() res: Response) {
    if (req?.filename) {
      const dir = req?.filename.split('_')[0];
      const filename = req?.filename.split('_')[1];
      const url = join(__dirname, `../public/upload/${dir}/${filename}`);
      res.download(url);
    }
  }

  @ApiOperation({
    summary: '获取文件zip下载链接',
  })
  @Get('zip')
  async stream(@Query() req: downloadDto, @Res() res: Response) {
    if (req?.filename && req?.filename.indexOf('_') !== -1) {
      const dir = req?.filename.split('_')[0];
      const filename = req?.filename.split('_')[1];
      const url = join(__dirname, `../attachment/${dir}/${filename}`);
      const tarStream = new zip.Stream();
      await tarStream.addEntry(url);

      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=${req.filename}.zip`,
      );
      tarStream.pipe(res);
    }
  }
}
