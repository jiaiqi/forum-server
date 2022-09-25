import { ApiProperty } from '@nestjs/swagger';

export class uploadDto {
  @ApiProperty({
    description: '文件名称',
    example: '测试文件',
    required: false,
  })
  name: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  readonly file?: string;
}

export class downloadDto {
  @ApiProperty({
    description: '文件名',
    example: '20220925_1646217507126.jpg',
  })
  readonly filename?: string;
}
