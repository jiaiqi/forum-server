import { Injectable } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsOptional, IsUUID, ValidateIf } from 'class-validator';

@Injectable()
export class CreateCategoryDto {
  @IsUUID(undefined, { always: true, message: '父分类ID格式不正确' })
  @ValidateIf((p) => p.parent !== null && p.parent)
  @IsOptional({ always: true })
  @Transform(({ value }) => (value === 'null' ? null : value))
  parent?: string;
}
