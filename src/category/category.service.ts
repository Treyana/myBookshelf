import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CategoryDTO } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  getAll(): Promise<Category[]> {
    return this.categoryRepo.find();
  }

  async isCategoryExist(id: number): Promise<boolean> {
    const category = await this.categoryRepo.findOne({ where: { id: id } });
    return !!category;
  }

  async getOneById(id: number): Promise<Category> {
    try {
      const category = await this.categoryRepo.findOneOrFail({
        where: { id: id },
      });
      return category;
    } catch (error) {
      console.log('Get one category by id error:', error.message ?? error);
      throw new HttpException(
        'Category with id ${id} not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // createCategory(cate_name: string): Promise<Category> {
  //   const newCate = this.categoryRepo.create({ cate_name });
  //   return this.categoryRepo.save(newCate);
  // }

  createCategory(dto: CategoryDTO) {
    const newCategory = this.categoryRepo.create(dto);
    return this.categoryRepo.save(newCategory);
  }

  async updateCategory(id: number, dto: CategoryDTO): Promise<Category> {
    const category = await this.categoryRepo.findOne({ where: { id: id } });
    Object.assign(category, dto);
    return this.categoryRepo.save(category);
  }

  async softDeleteCategory(id: number): Promise<UpdateResult> {
    return await this.categoryRepo.softDelete(id);
  }

  // async deleteCategory(id: number): Promise<Category> {
  //   const category = await this.getOneById(id);
  //   return this.categoryRepo.remove(category);
  // }
}
