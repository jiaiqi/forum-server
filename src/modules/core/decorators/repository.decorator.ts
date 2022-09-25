// src/modules/core/decorators/repository.decorator.ts
// 定义装饰器
import { SetMetadata } from '@nestjs/common';
import { ObjectType } from 'typeorm';
import { CUSTOM_REPOSITORY_METADATA } from '../constants';
export const CustomRepository = <T>(entity: ObjectType<T>): ClassDecorator =>
  SetMetadata(CUSTOM_REPOSITORY_METADATA, entity);
