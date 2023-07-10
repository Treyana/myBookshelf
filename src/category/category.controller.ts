import { CategoryDTO } from './category.dto';
import { CategoryService } from './category.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories() {
    return await this.categoryService.getAll();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: number, @Body() dto: CategoryDTO) {
    const categoryExists = await this.categoryService.isCategoryExist(id);
    if (categoryExists) {
      return await this.categoryService.getOneById(id);
    } else {
      return 'Category does not exist!!!';
    }
  }

  @Post('/create')
  async createCategory(@Body() dto: CategoryDTO) {
    return await this.categoryService.createCategory(dto);
  }

  @Patch(':id')
  // @Put(':id')
  async updateCategory(@Param('id') id: number, @Body() dto: CategoryDTO) {
    const categoryExist = await this.categoryService.isCategoryExist(id);
    if (categoryExist) {
      return await this.categoryService.updateCategory(id, dto);
    } else {
      return 'Category does not exist!!!';
    }
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number) {
    return await this.categoryService.softDeleteCategory(id);
  }
}
