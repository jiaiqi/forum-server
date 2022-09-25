import { Get } from '@nestjs/common';
import { CategoryService } from '../services/category.service';

export class CategoryController {
  constructor(protected categoryService: CategoryService) {}

  @Get()
  async index() {
    return this.categoryService.findTrees();
  }
}
