import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class GetPostDto {
  @ApiProperty({
    description: '文章ID',
  })
  @IsNotEmpty({ message: '请传入id' })
  readonly id: any;
}
